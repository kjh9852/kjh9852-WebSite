import React from 'react';

import styles from './Button.module.scss';

type ButtonVariant = 'default' | 'submit' | 'warning' | 'underline';

type ButtonSize = 'small' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  variant,
  size,
  children,
  onButtonClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${variant ? styles[variant] : ''} ${size ? styles[size] : ''}`}
      onClick={onButtonClick}
      {...rest}
    >
      {children}
    </button>
  );
}
