import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import React, { useState } from 'react';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interface/menu.interface';
import { TopPageModel } from '../../interface/page.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { ProductModel } from '../../interface/product.interface';
import { v4 as uuidv4 } from 'uuid';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';

function TopPage({ firstCategory, menu, page, products }: TopPageProps): JSX.Element {
	return (
		<>
			{/* {products && products.map (m => (<div key={m._id}>{m.title}</div>))} */}
			<TopPageComponent firstCategory={firstCategory} page={page} products={products}/>
		</>
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (let i of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: i.id
		});
		paths = paths.concat (menu.flatMap(m => m.pages.map(p => `/${i.route}/${p.alias}`)));
	}
	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}

	const firstCategoryItem = firstLevelMenu.find (m => m.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}

	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory:firstCategoryItem.id
		});
		if (menu.length == 0) {
			return {
				notFound: true
			};
		}
		const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
		const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
			category: page.category,
			limit: 10
		}); 
	
		return {
			props: {
				menu,
				firstCategory:firstCategoryItem.id,
				page,
				products
			}
		};
	} catch {
		return {
			notFound: true
		};
	}
	
};

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
	page: TopPageModel;
	products: ProductModel[];
}