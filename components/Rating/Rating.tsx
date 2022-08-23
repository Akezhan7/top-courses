import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react'
import styles from './Rating.module.scss';
import StarIcon from './star.svg';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import { FieldError } from 'react-hook-form';

interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
}

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(({isEditable, rating, setRating, error, ...atrib}:RatingProps, ref:ForwardedRef<HTMLDivElement>):JSX.Element => {

  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))

  useEffect (() => {
    constructRating (rating);
  }, [rating])

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map ((r:JSX.Element, num:number) => {
      return (
        <>

          <StarIcon 
          className={cn (styles.star, {
            [styles.filled]: num < currentRating,
            [styles.edit]: isEditable,
            [styles.error]: error
          })}
          onClick = {() => onEdit(num + 1)}
          onMouseEnter = {()=> changeDisplayRate(num+1)}
          onMouseLeave = {()=> changeDisplayRate(rating)}
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handlespace(num + 1, e)}
          />
         
        </>
      )
    })
    setRatingArray (updatedArray);
  }

  const changeDisplayRate = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating (i);
  }

  const onEdit = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating (i);
  }

  const handlespace = (i:number, e:KeyboardEvent<SVGElement>) => {
    if (e.code != 'Space' || !setRating) {
        return;
    }

    setRating (i);
}

  return (
    <div {...atrib} ref={ref} className={styles.wrap}>
      {ratingArray.map ((rat, i) => (<span key={i}>{rat}</span>))}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
});
