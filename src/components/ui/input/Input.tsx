import clsx from 'clsx';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CloseIcon, CheckIcon, PasswordIcon } from '@/components/ui/icons';

import styles from './Input.module.scss';

type InputProps = {
  id: string;
  type: string;
  label?: string;
  variant?: 'default' | 'unstyled';
  shape?: 'rounded' | 'default';
  placeHolder?: string;
  isPassword?: boolean;
  showValidationIcon?: boolean;
  showErrorMessage?: boolean;
  className?: string | undefined;
  inputClassName?: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  id,
  type,
  label,
  placeHolder,
  shape = 'rounded',
  variant = 'default',
  isPassword = false,
  showValidationIcon = false,
  showErrorMessage = true,
  className,
  inputClassName,
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

  const isUnstyled = variant === 'unstyled';

  const errorMessage =
    fieldError && 'message' in fieldError ? fieldError.message : undefined;

  const handleToggleVisigle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={clsx(styles.inputContainer, className)}>
        <input
          className={clsx(
            styles.input,
            !isUnstyled && styles.focusOutline,
            shape === 'rounded' && styles.square,
            fieldError && styles.error,
            inputClassName
          )}
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
      {showErrorMessage && errorMessage && (
        <p className={styles.errorMessage}>{String(errorMessage)}</p>
      )}
    </>
  );
}
