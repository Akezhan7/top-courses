import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from './Advantages.module.scss';
import cn from 'classnames';
import { HhData, TopPageAdvantage } from "../../interface/page.interface";
import { Card, P } from "..";
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from './check.svg';
import { priceRu } from "../../helpers/helpers";
interface AdvantagesProps {
    advantages: TopPageAdvantage[];
}

export function Advantages ({advantages}:AdvantagesProps):JSX.Element {
    return (
        <div className={styles.advantages}>
             {advantages.map (item => (
                 <div className={styles.block} key={uuidv4()}>
                     <div className={styles.wrapper}>
                        <div className={styles.icon}>
                            <CheckIcon/>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.title}>{item.title}</div>
                        </div>
                     </div>
                     <div className={styles.descr}><P size='18'>{item.description}</P></div>
                 </div>
             ))}
        </div>
    )
}