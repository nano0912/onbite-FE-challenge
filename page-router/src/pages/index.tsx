import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import fetchRecoMovies from '@/lib/fetch-reco-movies';
import fetchAllMovies from '@/lib/fetch-all-movies';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export const getStaticProps = async () => {
  const [recoMovies, allMovies] = await Promise.all([
    fetchRecoMovies(),
    fetchAllMovies(),
  ]);

  return {
    props: { recoMovies, allMovies },
    revalidate: 10,
  };
};

export default function Home({
  recoMovies,
  allMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 시네마</title>
        <meta property='og:image' content='/thumnail.png' />
        <meta property='og:title' content='한입 시네마' />
        <meta
          property='og:description'
          content='한입 시네마에 등록된 영화들을 만나보세요'
        />
      </Head>
      <section className={style.section}>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.movie_list}>
          {recoMovies.map((movie) => (
            <MovieItem key={`reco-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
      <section className={style.section}>
        <h2>등록된 모든 영화</h2>
        <div className={style.all_movie_list}>
          {allMovies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
