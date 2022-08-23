import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Htag, Input, P, Rating, Tag, TextArea } from '../components';
import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interface/menu.interface';
import { v4 as uuidv4 } from 'uuid';
import { API } from '../helpers/api';

function Home({menu}:HomeProps):JSX.Element {
  const [count, setCount] = useState<number> (4);

  return (
    <>
        <Htag tag='h1'>{count}</Htag>
        <Button theme='primary' arrow="right">Кнопка 1</Button>
        <Button theme='ghost' arrow='down' >Кнопка 1</Button>
        <P size='16'>лят эффективно взаимодействовать в команде с менеджерами, разработчиками и маркетологами. Выпускники факультета могут успешно конкурировать с веб-дизайнерами уровня middle.</P>
        <Tag>10</Tag>
        <Tag size='s' color='green'>-10 000 ₽ </Tag>
        <Tag size='s' color="gray">Photoshop</Tag>
        <Tag size='m' color='red'>hh.ru</Tag>
        <Tag color='primary'>Web дизайн</Tag>
        <Rating rating={count} isEditable setRating={setCount}/>
        <Input/>
        <TextArea/>
    </>
  )
}

export default withLayout(Home);

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