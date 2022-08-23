/* eslint-disable react/display-name */
import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";
import styles from './Card.module.scss';
import cn from 'classnames';
interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    color?: 'white' | 'blue';
    children: ReactNode;
}

export const Card = forwardRef (({color = 'white', children, className, ...atrib}:CardProps, ref: ForwardedRef<HTMLDivElement>):JSX.Element => {
    return (
        <div className={cn(styles.card, className, {
            [styles.blue]: color == 'blue'
        })} ref={ref} {...atrib}>
            {children}
        </div>
    )
});