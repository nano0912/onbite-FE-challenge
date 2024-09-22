import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import { ReactNode, useEffect, useState } from 'react';
import fetchAllMovies from '@/lib/fetch-all-movies';
import { MovieData } from '@/types';
import { useRouter } from 'next/router';

export default function Search() {
  const [searchMovie, setSearchMovie] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchAllMovies(q as string);
    setSearchMovie(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  if (!searchMovie.length) {
    return <div className='no-results'>검색 결과가 없습니다</div>;
  }

  return (
    <div className={style.movie_list}>
      {searchMovie.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
