import { useEffect, useRef } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  onClose: () => void
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [onClose]);

  return ref;
}
