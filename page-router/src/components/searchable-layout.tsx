import { useRouter } from 'next/router';
import style from './searchable-layout.module.css';
import React, { ReactNode, useEffect, useState } from 'react';

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search === '' || q === search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <form className={style.searchbar} onSubmit={onSubmit}>
        <input
          value={search}
          onChange={onChangeInput}
          type='search'
          placeholder='검색어를 입력하세요 ...'
        />
        <button type='submit'>검색</button>
      </form>

      {children}
    </div>
  );
}
