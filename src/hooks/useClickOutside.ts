import { useEffect, useRef, type RefObject } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  triggerRef: RefObject<HTMLElement | null>,
  menuRef: RefObject<HTMLElement | null>,
  onClose: () => void
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      onClose();
    };

    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [triggerRef, menuRef, onClose]);

  return ref;
}
