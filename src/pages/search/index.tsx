import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import { ReactNode } from 'react';
import fetchAllMovies from '@/lib/fetch-all-movies';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q as string;

  const searchMovie = await fetchAllMovies(q);

  return {
    props: { searchMovie },
  };
};

export default function Search({
  searchMovie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
