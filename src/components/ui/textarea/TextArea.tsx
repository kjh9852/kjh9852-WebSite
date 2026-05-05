import React from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './TextArea.module.scss';

type TextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  name,
  label,
  placeholder,
  helperText,
  ...rest
}: TextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const errorMessage = error?.message;

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        className={`${styles.textArea} ${errorMessage && styles.error}`}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />
      {(errorMessage || helperText) && (
        <p className={errorMessage ? styles.errorMessage : styles.helperText}>
          {String(errorMessage || helperText)}
        </p>
      )}
    </div>
  );
}
