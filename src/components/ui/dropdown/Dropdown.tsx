import gsap from 'gsap';
import type { SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import useClickOutside from '@/hooks/useClickOutside';

import styles from './Dropdown.module.scss';

interface List<T> {
  label: React.ReactNode;
  value: T;
  onClick?: () => void;
}

export default function Dropdown<T>({
  portal = false,
  children,
  dropdownList,
  isOpen,
  setOpen,
  positionStyle,
  onSelect,
  value,
}: {
  portal?: boolean;
  children: React.ReactNode;
  dropdownList?: readonly List<T>[];
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  positionStyle?: React.CSSProperties;
  onSelect?: (value?: T, label?: React.ReactNode) => void;
  value?: T;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [listRender, setListRender] = useState(isOpen);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useClickOutside(triggerRef, container, () => setOpen(false));

  gsap.config({
    nullTargetWarn: false,
  });

  useEffect(() => {
    if (!portal || !isOpen) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({
        top: rect.top,
        left: rect.left,
      });
    };

    updatePosition();
  }, [isOpen, portal]);

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

  const menu = (
    <div
      className={`${styles.overlay} ${portal ? styles.portal : ''}`}
      style={
        portal
          ? {
              top: position.top + 35,
              left: position.left,
            }
          : positionStyle
      }
      ref={container}
    >
      <ul
        className={`${styles.menu} dropDown`}
        role="listbox"
        aria-label="메뉴 선택 목록"
      >
        {dropdownList?.map((list, idx) => {
          const isSelected = value !== undefined ? list.value === value : false;

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
  );

  return (
    <>
      <div className={styles.dropdownContainer} ref={triggerRef}>
        {children}
        {!portal && listRender && menu}
      </div>
      {portal && listRender && createPortal(menu, document.body)}
    </>
  );
}
