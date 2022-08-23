import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import styles from './Sidebar.module.scss';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import Logo from '../Logo.svg';
import Link from 'next/link';
import { Search } from '../../components';

interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export function Sidebar({className,...props}:SidebarProps):JSX.Element {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Link href={`/`}>
        <a><Logo className={styles.logo}/></a>
      </Link>
      <Search/>
      <Menu/>
    </div>
  )
}
