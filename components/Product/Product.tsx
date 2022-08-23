/* eslint-disable @next/next/no-img-element */
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useRef, useState } from 'react'
import styles from './Product.module.scss';
import cn from 'classnames';
import { ProductModel } from '../../interface/product.interface';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import {declOfNum, priceRu} from '../../helpers/helpers'
import Image from 'next/image';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel
}

export function Product ({product ,className,...atrib}:ProductProps):JSX.Element {
  const src = process.env.NEXT_PUBLIC_DOMAIN + product.image;
  const [isReview, setIsReview] = useState<boolean> (false)

  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToReview = () => {
     setIsReview(true);
     reviewRef.current?.scrollIntoView({
       behavior:'smooth',
       block:'start'
     })
  }

  return (
    <>
      <Card className={styles.product}>
          <div className={styles.genBlock}>
              <div className={styles.firstBlock}>
                <div className={styles.logo}>
                    <Image
                      src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                      alt={product.title}
                      width={70}
                      height={70}
                      loader={() => src}
                    />
                  </div>
                <div className={styles.firstblockContent}>
                  <div className={styles.title}>{product.title}</div>
                  <div className={styles.tags}>{product.categories.map (item => <Tag key={uuidv4()} color='gray'>{item}</Tag>)}</div>
                </div>
              </div>
              <div className={styles.secondBlock}>
                  <div className={styles.secondBlockItem}>
                      <div className={styles.price}>{priceRu(product.price)} <span><Tag color='green'>{priceRu(product.price - product.oldPrice)}</Tag></span></div>
                      <div className={styles.priceTitle}>цена</div>
                  </div>
                  <div className={styles.secondBlockItem}>
                      <div className={styles.credit}>{priceRu(product.credit)}<span>/мес</span></div>
                      <div className={styles.creditTitle}>кредит</div>
                  </div>
                  <div className={styles.secondBlockItem}>
                      <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
                      <div className={styles.rateTitle}><span onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв' , 'отзыва', 'отзывов'])}</span></div>
                  </div>
              </div>
          </div>
          <div className={styles.hr}><hr className={styles.hr} /></div>
          <div className={styles.descr}>{product.description}</div>
          <div className={styles.threeBlock}>
              <div className={styles.feach}>
                {product.characteristics.map (item => (
                    <div className={styles.chars} key={uuidv4()}>
                        <span className={styles.charsName}>{item.name}</span>
                        <span className={styles.charsDots}></span>
                        <span className={styles.charsValue}>{item.value}</span>
                    </div>
                ))}
              </div>
              <div className={styles.advBlock}>
                  {product.advantages && 
                    <div className={styles.advantages}>
                      <div className={styles.advTitle}>Преимущества</div>
                      <div className={styles.advSubTitle}>{product.advantages}</div>
                    </div>
                  }
                  {product.disadvantages && 
                    <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Недостатки</div>
                        <div className={styles.advSubTitle}>{product.disadvantages}</div>
                    </div>
                  }
              </div>
          </div>
          <div className={styles.hr}><hr/></div>
          <div className={styles.actions}>
              <Button 
                theme='primary'>Узнать подробнее</Button>
              <Button 
                theme='ghost' 
                arrow={isReview ? 'down' : 'right'}
                onClick={() => setIsReview(!isReview)}
              >Читать отзывы</Button>
          </div>
      </Card>
      <Card color='blue' className={cn(styles.reviews, {
        [styles.opened]: isReview,
        [styles.closed]: !isReview 
      })} ref={reviewRef}>
          {product.reviews.map (item => (
            <div key={uuidv4()}>
              <Review review={item}/>
            </div>
          ))}
          <ReviewForm productId={product._id} />
      </Card>
    </>
  )
}
