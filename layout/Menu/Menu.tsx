import React, { useContext, useState } from 'react'
import cn from 'classnames';
import styles from './Menu.module.scss'
import { AppContext } from '../../context/app.context';
import { v4 as uuidv4 } from 'uuid';
import { FirstLevelMenuItem, PageItem } from '../../interface/menu.interface';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';



export const Menu = ():JSX.Element => {

  const {menu, setMenu, firstCategory} = useContext(AppContext);

  const router = useRouter ();

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu (menu.map (m => {
      if (m._id.secondCategory == secondCategory) {
        m.isOpened = !m.isOpened;
      }
      return m;
    }))
  }

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map (m => (
          <div key={uuidv4()}>
            <Link href={`/${m.route}`}>
                <a>
                  <div className={cn (styles.firstLevel, {
                    [styles.firstLevelActive]: m.id == firstCategory
                  })}>
                    {m.icon}
                    <span>{m.name}</span>
                  </div>
                </a>
            </Link>
              {m.id == firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>  
    );
  };


  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
          {menu.map (m => {
            if (m.pages.map (p => p.alias).includes(router.asPath.split('/')[2])) {
              m.isOpened = true;
            }
            return (
                <div key={uuidv4()} className={styles.secondBlockElem}>
                  <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                  <div className={cn(styles.secondLevelBlock, {
                    [styles.secondLevelBlockOpened]: m.isOpened
                  })}>{buildThirdLevel(m.pages, menuItem.route)}</div>
                </div>
            )
            
          })} 
      </div>  
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string ) => {
      return (
        pages.map (p => (
          <Link key={uuidv4()} href={`/${route}/${p.alias}`}>
             <a className={cn(styles.thirdLevel, {
                  [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                })}>
                {p.category}
             </a>
          </Link>
         
        ))
      )
  }

  return (
    <div>
        {buildFirstLevel()}
    </div>
  )
}
