import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CloseIcon, CheckIcon, PasswordIcon } from '@/components/ui/icons';

import styles from './Input.module.scss';

type InputProps = {
  id: string;
  type: string;
  label: string;
  placeHolder?: string;
  isPassword?: boolean;
  showValidationIcon?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  id,
  type,
  label,
  placeHolder,
  isPassword = false,
  showValidationIcon = false,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext();
  const [isVisible, setIsVisible] = useState(false);
  const fieldValue = watch(id);
  const fieldError = errors[id];
  const touchedField = touchedFields[id];

  const errorMessage =
    fieldError && 'message' in fieldError ? fieldError.message : undefined;

  const handleToggleVisigle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${fieldError && styles.error}`}
          type={isPassword ? (isVisible ? 'text' : 'password') : type}
          id={id}
          placeholder={placeHolder}
          {...register(id)}
          {...rest}
        />
        <div className={styles.fieldIconContainer}>
          {showValidationIcon &&
            touchedField &&
            fieldValue &&
            (fieldError ? <CloseIcon /> : <CheckIcon />)}
          {isPassword && (
            <PasswordIcon
              onVisible={handleToggleVisigle}
              isVisible={isVisible}
            />
          )}
        </div>
      </div>
      {errorMessage && (
        <p className={styles.errorMessage}>{String(errorMessage)}</p>
      )}
    </>
  );
}
