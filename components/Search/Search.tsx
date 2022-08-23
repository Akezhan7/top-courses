import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from 'react'
import styles from './Search.module.scss';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';

interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    
}

export function Search ({className, ...atrib}:SearchProps):JSX.Element {

  const [search, setSearch] = useState<string> ('');
  const router = useRouter ();
  const goToSearch = () => {
      router.push ({
        pathname: '/search',
        query: {
            q: search
        }
      })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      goToSearch ();
    }
  }

  return (
    <div className={styles.search} {...atrib}>
      <Input 
          placeholder='Поиск...' 
          className={styles.input}
          value={search}
          onChange={(e) => setSearch (e.target.value)}
          onKeyDown={handleKeyDown}
      />
      <Button theme='primary' className={styles.btn} onClick={goToSearch}>
          <SearchIcon className={styles.icon}/>
      </Button>
    </div>
  )
}
