import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import styles from './Layout.module.scss';
import cn from 'classnames';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { AppContextProvider, IAppContext } from '../context/app.context';

interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}

function Layout({children}:LayoutProps):JSX.Element {
  return (
    <div className={styles.wrapper}>
        <Header className={styles.header}/>
        <Sidebar className={styles.sidebar}/>
        <div className={styles.body}>
            {children}
        </div>
        <Footer className={styles.footer}/>
    </div>
  )
}

export function withLayout <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) {
  return function withLayoutComponent (props: T):JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
          <Layout>
              <Component {...props}/>
          </Layout>
      </AppContextProvider>
    )
  }
}