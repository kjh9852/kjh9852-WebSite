import { useState } from 'react';
import type { SetStateAction } from 'react';

export default function useToggle(
  initialValue: boolean
): [boolean, () => void, React.Dispatch<SetStateAction<boolean>>] {
  const [state, setState] = useState(initialValue);

  const toggleState = () => setState((prev) => !prev);

  return [state, toggleState, setState];
}
