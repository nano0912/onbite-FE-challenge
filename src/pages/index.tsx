import { ReactNode, useEffect, useState } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import dummy from '../mock/dummy.json';
import { MovieData } from '@/types';

export default function Home() {
  const [data, setData] = useState<MovieData[]>([]);

  useEffect(() => {
    setData(dummy as MovieData[]);
  }, []);

  return (
    <>
      <section className={style.section}>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.movie_list}>
          {data.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section className={style.section}>
        <h2>등록된 모든 영화</h2>
        <div className={style.all_movie_list}>
          {data.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
