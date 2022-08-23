import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from './Sort.module.scss';
import cn from 'classnames';
import SortIcon from './sorticon.svg';
interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    sort: SortEnum;
    setSort: (sort: SortEnum) => void;
}

export enum SortEnum {
    Rating,
    Price
}

export function Sort ({sort, setSort, className, ...attributes}:SortProps):JSX.Element {
    return (
        <div className={cn(styles.sort, className)} {...attributes}>
            <span
                onClick={() => setSort(SortEnum.Rating)}
                className={cn({
                    [styles.active]:sort == SortEnum.Rating
                })}
            >
                <SortIcon className={styles.sortIc}/>По рейтингу
            </span>
            <span
                onClick={() => setSort(SortEnum.Price)}
                className={cn({
                    [styles.active]:sort == SortEnum.Price
                })}
            >
                <SortIcon className={styles.sortIc}/>По цене
            </span>
        </div>
    )
}