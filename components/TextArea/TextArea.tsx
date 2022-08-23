import React, { DetailedHTMLProps, TextareaHTMLAttributes, ReactNode, ForwardedRef, forwardRef } from 'react'
import styles from './TextArea.module.scss';
import cn from 'classnames';
import { FieldError } from 'react-hook-form';

interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    error?: FieldError;
}

// eslint-disable-next-line react/display-name
export const TextArea = forwardRef(({error, className, ...atrib}:TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>):JSX.Element => {
  return (
    <div className={cn(className, styles.wrap)}>
        <textarea className={cn (styles.textarea, {
          [styles.error]: error
        })} ref={ref} {...atrib} placeholder="Текст"/>
        {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
}); 
