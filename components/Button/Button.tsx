import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import styles from './Button.module.scss';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';
interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    theme: 'primary' | 'ghost';
    children: ReactNode;
    arrow?: 'right' | 'down' | 'none'
}

export function Button ({theme, children, arrow = 'none',className, ...attributes}:ButtonProps):JSX.Element {
    return (
        <button className={cn(className,styles.btn, {
            [styles.primary]: theme == 'primary',
            [styles.ghost]: theme == 'ghost'
        })}
        {...attributes}
        >{children}
        {arrow != 'none' && <span className={cn(styles.arrow, {
            [styles.down]: arrow == 'down',
        })}><ArrowIcon/></span>}
        </button>
    )
}