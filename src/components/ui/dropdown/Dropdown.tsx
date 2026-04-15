import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import type { SetStateAction } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import styles from './DropDown.module.scss';

interface List {
  btnLabel: string;
  btnType?: string;
  onClick?: () => void;
}

export default function DropDown({
  children,
  dropdownList,
  isOpen,
  setOpen,
  positionStyle,
  onSelect,
}: {
  children: React.ReactNode;
  dropdownList?: List[];
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  positionStyle?: React.CSSProperties;
  onSelect?: (value: string) => void;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const [listRender, setListRender] = useState<boolean>(isOpen);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  gsap.config({
    nullTargetWarn: false,
  });

  if (isOpen && !listRender) {
    setListRender(true);
  }

  useEffect(() => {
    if (!listRender) return;

    const dropdownTimeline = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: 'power2.out',
      },
    });

    const element = container.current;
    const dropdownList = element?.querySelector('.dropDown') as HTMLElement;

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
    <div className={styles.container} ref={dropdownRef}>
      {children}
      {listRender && (
        <div
          className={styles.listContainer}
          style={positionStyle}
          ref={container}
        >
          <ul className={`${styles.menuContainer} dropDown`}>
            {dropdownList?.map((list) => (
              <li
                key={list.btnLabel}
                className={styles.menu}
                onClick={() => {
                  list.onClick?.();
                  onSelect?.(list.btnLabel);
                }}
              >
                {list.btnLabel}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
