import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import styles from './Tag.module.scss';
import cn from 'classnames';

interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    size?: 's' | 'm';
    color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
    href?: string;
    children: ReactNode;
}

export function Tag({size = 's', children, color = 'ghost', href, ...atrib}:TagProps):JSX.Element {
  return (
    <div className={cn(styles.tag, {
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
        [styles.ghost]: color == 'ghost',
        [styles.red]: color == 'red',
        [styles.gray]: color == 'gray',
        [styles.green]: color == 'green',
        [styles.primary]: color == 'primary',
    })}{...atrib}>
      { 
        href 
        ? <a href={href}>{children}</a>
        :<>{children}</>
      }
    </div>
  )
}
