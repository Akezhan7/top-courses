import React, { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss';
import cn from 'classnames';
import { FieldError } from 'react-hook-form';
import { spawn } from 'child_process';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: FieldError;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef (({ error, className, ...atrib }:InputProps, ref: ForwardedRef<HTMLInputElement>):JSX.Element => {
    return (
      <div  className={cn(className, styles.wrap)}>
        <input className={cn (styles.input, {
          [styles.error]: error
        })} ref={ref} {...atrib}/>
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
});
