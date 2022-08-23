import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import styles from './P.module.scss';
import cn from 'classnames';

interface ParProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    size: '14' | '16' | '18';
    children: ReactNode;
}

export function P({size = '16', children, ...atrib}:ParProps):JSX.Element {
  return (
    <p className={cn(styles.par, {
        [styles.size14]: size == '14',
        [styles.size16]: size == '16',
        [styles.size18]: size == '18',
    })}{...atrib}>{children}</p>
  )
}
