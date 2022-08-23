import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from './HhDataComp.module.scss';
import cn from 'classnames';
import { HhData } from "../../interface/page.interface";
import { Card } from "..";
import RateIcon from './rate.svg';
import { priceRu } from "../../helpers/helpers";
interface HhDataProps extends HhData {
}

export function HhDataComp ({count, juniorSalary, middleSalary, seniorSalary}:HhDataProps):JSX.Element {
    return (
        <div className={styles.hh}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего вакансий</div>   
                <div className={styles.countCol}>{count}</div> 
            </Card> 
            <Card className={styles.salary}>
                <div className={styles.salaryBlock}>
                    <div className={styles.title}>Начальный</div>   
                    <div className={styles.countCol2}>{priceRu(juniorSalary)}</div> 
                    <div className={styles.rates}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon/>
                        <RateIcon/>
                    </div>
                </div>
                <div className={styles.salaryBlock}>
                    <div className={styles.title}>Средний</div>   
                    <div className={styles.countCol2}>{priceRu(middleSalary)}</div> 
                    <div className={styles.rates}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                        <RateIcon/>
                    </div>
                </div>
                <div className={styles.salaryBlock}>
                    <div className={styles.title}>Профессионал</div>   
                    <div className={styles.countCol2}>{priceRu(seniorSalary)}</div> 
                    <div className={styles.rates}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                    </div>
                </div>
            </Card>        
        </div>
    )
}