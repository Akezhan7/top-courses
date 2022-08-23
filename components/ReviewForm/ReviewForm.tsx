/* eslint-disable @next/next/no-img-element */
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from 'react'
import styles from './ReviewForm.module.scss';
import cn from 'classnames';
import { ProductModel, ReviewModel } from '../../interface/product.interface';
import { Rating } from '../Rating/Rating';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from './close.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { API } from '../../helpers/api';

interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: string;
}

interface FormProps {
  name: string;
	title: string;
	description: string;
	rating: number;
}

interface ReviewFormPropsResponse {
  message: string;
}

export function ReviewForm ({productId ,className,...atrib}:ReviewFormProps):JSX.Element {
  const { register, control, handleSubmit, formState:{errors}, reset} = useForm<FormProps>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: FormProps) => {
    try {
      const { data } = await axios.post<ReviewFormPropsResponse>(API.review.createDemo, {...formData, productId});
      if (data.message) {
        setIsSuccess (true);
        reset ();
      } else {
        setIsError ('Что-то пошло не так');
      }
    } catch (e) {
      if (e instanceof Error) {
        setIsError(e.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn(styles.reviewForm, className)} {...atrib}>
            <Input 
              {...register('name', {required: {value: true, message: 'Заполните имя'}})} 
              placeholder='Имя'
              error={errors.name}
            />
            <Input 
              {...register('title', {required: {value: true, message: 'Заполните заголовок'}})}  
              placeholder='Заголовок отзыва' className={styles.title}
              error={errors.title}
            />
            <div className={styles.rating}>
                <span>Оценка:</span>
                <Controller 
                  control={control}
                  name='rating'
                  rules={{required: {value: true, message:'Выберите оценку'}}}
                  render={({ field }) => (
                    <Rating isEditable rating={field.value} ref={field.ref} error={errors.rating} setRating={field.onChange}/>
                  )}
                />
            </div>
            <TextArea 
              {...register('description', {required: {value: true, message: 'Заполните отзыв'}})}  
              placeholder='Текст отзыва' className={styles.description}
              error={errors.description}
            />
            <div className={styles.submit}>
                <Button theme='primary'>Отправить</Button>
                <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
        </div>
        {isSuccess && <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>
            Спасибо, ваш отзыв будет опубликован после проверки.
          </div>
          <button className={styles.close} onClick={() => setIsSuccess(false)}>
            <CloseIcon />
          </button>
			  </div>}
        {isError && <div className={cn(styles.error, styles.panel)}>
          <div className={styles.successTitle}>Что-то пошло не так, попробуйте обновить страницу</div>
          <button className={styles.close} onClick={() => setIsError(undefined)}>
            <CloseIcon />
          </button>
			  </div>}
    </form>
  )
}
