import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import type { SetStateAction } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import styles from './Dropdown.module.scss';

interface List<T> {
  label: React.ReactNode;
  value: T;
  onClick?: () => void;
}

export default function Dropdown<T>({
  children,
  dropdownList,
  isOpen,
  setOpen,
  positionStyle,
  onSelect,
  value,
}: {
  children: React.ReactNode;
  dropdownList?: readonly List<T>[];
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  positionStyle?: React.CSSProperties;
  onSelect?: (value?: T, label?: React.ReactNode) => void;
  value?: T;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const [listRender, setListRender] = useState(isOpen);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setOpen(false));
  console.log(onSelect);
  gsap.config({
    nullTargetWarn: false,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setListRender(true);
  }, [isOpen]);

  useEffect(() => {
    if (!listRender) return;

    const dropdownTimeline = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: 'power2.out',
      },
    });

    const element = container.current;
    const dropdownList = element?.querySelector('.dropDown');
    if (!dropdownList) return;

    if (isOpen) {
      dropdownTimeline.fromTo(
        dropdownList,
        { height: 0 },
        {
          height: dropdownList?.scrollHeight,
        }
      );
    } else {
      dropdownTimeline.fromTo(
        dropdownList,
        { height: dropdownList?.scrollHeight },
        {
          height: 0,
          onComplete: () => setListRender(false),
        }
      );
    }

    return () => {
      dropdownTimeline.kill();
    };
  }, [isOpen, listRender]);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      {children}
      {listRender && (
        <div className={styles.overlay} style={positionStyle} ref={container}>
          <ul
            className={`${styles.menu} dropDown`}
            role="listbox"
            aria-label="메뉴 선택 목록"
          >
            {dropdownList?.map((list, idx) => {
              const isSelected =
                value !== undefined ? list.value === value : false;

              return (
                <li
                  key={idx}
                  tabIndex={0}
                  role="option"
                  aria-selected={isSelected}
                  className={styles.item}
                  onClick={() => {
                    setOpen(false);
                    onSelect?.(list?.value, list?.label);
                  }}
                >
                  {list.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
