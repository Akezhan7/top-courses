import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import styles from './Header.module.scss';
import cn from 'classnames';

interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export function Header ({...props}:HeaderProps):JSX.Element {
  return (
    <div {...props}>
      Header
    </div>
  )
}
