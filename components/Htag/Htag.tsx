import { ReactNode } from "react";
import styles from './Htag.module.css';
import cn from 'classnames';
interface HtagProps {
    tag: 'h1' | 'h2' | 'h3';
    children: ReactNode;
}

export function Htag ({tag, children, ...atrib}:HtagProps):JSX.Element {
    return (
        <>
            {tag == 'h1' && <h1 className={styles.h1} {...atrib}>{children}</h1>}
            {tag == 'h2' && <h2 className={styles.h2} {...atrib}>{children}</h2>}
            {tag == 'h3' && <h3 className={styles.h3} {...atrib}>{children}</h3>}
        </>
    )
}