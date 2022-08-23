import { TopLevelCategory, TopPageModel } from "../../interface/page.interface";
import { ProductModel } from "../../interface/product.interface";
import styles from './TopPageComponent.module.scss';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { Advantages, HhDataComp, Htag, P, Product, Sort, SortEnum, Tag } from "../../components";
import { useEffect, useReducer } from "react";
import { setReducer } from "./sort.reducer";
interface TopPageComponentProps extends Record<string, unknown> {
	firstCategory: number;
	page: TopPageModel;
	products: ProductModel[];
}

export function TopPageComponent ({firstCategory, page, products}:TopPageComponentProps):JSX.Element {

    const [{products: sortedProducts, sort}, dispathSort] = useReducer (setReducer, {products, sort:SortEnum.Rating});

    const setSort = (sort: SortEnum) => {
        dispathSort({type: sort})
    }

    useEffect (() => {
        dispathSort({type:'reset', initialState: products})
    }, [products])

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag size='m' color='ghost'>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div>
                {sortedProducts && sortedProducts.map (p => (<Product key={uuidv4()} product={p}/>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag size="m" color="red">hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhDataComp {...page.hh}/>}
            {page.advantages && page.advantages.length > 0 && 
                <div className={styles.adv}>
                    <div className={styles.titleAdv}>
                        <Htag tag="h2">Преимущества</Htag>
                    </div>
                    <Advantages advantages={page.advantages}/>
                </div>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html:page.seoText}}/>}
            <div className={styles.tags}>
                    <div className={styles.titleTags}>
                        <Htag tag="h2">Получаемые навыки</Htag>
                    </div>
                    <div className={styles.tagsWrap}>
                        {page.tags.map (item => (
                            <div key={uuidv4()} className={styles.tag}>
                                <Tag color='primary'>{item}</Tag>
                            </div>
                        ))}
                    </div>
            </div>
            

        </div>
    )
}