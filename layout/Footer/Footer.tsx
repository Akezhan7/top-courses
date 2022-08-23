import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import styles from './Footer.module.scss';
import cn from 'classnames';

interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export function Footer ({...props}:FooterProps):JSX.Element {
  return (
    <div {...props}>
      <div className={styles.text}>UsTop © 2020 - 2022 Все права защищены</div>
      <div className={styles.text}>Пользовательское соглашение</div>
      <div className={styles.text}>Политика конфиденциальности</div>
    </div>
  )
}
