/* eslint-disable @next/next/no-img-element */
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from 'react'
import styles from './Review.module.scss';
import cn from 'classnames';
import { ProductModel, ReviewModel } from '../../interface/product.interface';
import { Rating } from '../Rating/Rating';
import { v4 as uuidv4 } from 'uuid';
import UserIcon from './user.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ReviewModel
}

export function Review ({review ,className,...atrib}:ReviewProps):JSX.Element {
  const {name, title, description, createdAt, rating} = review;
  return (
    <div className={cn(styles.review, className)} {...atrib}>
        <UserIcon className={styles.icon}/>
        <div className={styles.title}>
            <span className={styles.name}>{name}:</span>
            <span className={styles.zag}>{title}</span>
        </div>
        <div className={styles.date}>
          {format (new Date (createdAt), 'dd MMMM yyyy', {locale: ru})}
        </div>
        <div className={styles.rating}>
           <Rating rating={rating}/>
        </div>
        <div className={styles.description}>
            {description}
        </div>
    </div>
  )
}
