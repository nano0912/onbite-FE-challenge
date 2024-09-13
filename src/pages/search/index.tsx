import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import MovieItem from '@/components/movie-item';
import dummy from '../../mock/dummy.json';
import style from './index.module.css';
import { ReactNode } from 'react';
import { MovieData } from '@/types';

const getFilteredMovies = (movies: MovieData[], query: string) => {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

export default function Search() {
  const router = useRouter();
  const q = router.query.q as string;

  const filteredMovies = getFilteredMovies(dummy, q);

  if (!filteredMovies.length) {
    return <div className='no-results'>검색 결과가 없습니다</div>;
  }

  return (
    <div className={style.movie_list}>
      {filteredMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
