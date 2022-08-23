import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Htag, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interface/menu.interface';
import { v4 as uuidv4 } from 'uuid';
import { API } from '../helpers/api';

function Search ({menu}:HomeProps):JSX.Element {
  const [count, setCount] = useState<number> (4);

  return (
    <>
        Search - pages
    </>
  )
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]> (API.topPage.find, {
    firstCategory
  })
  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}