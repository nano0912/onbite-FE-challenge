import fetchMovie from '@/lib/fetch-movie';
import style from './[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import fetchAllMovies from '@/lib/fetch-all-movies';
import Head from 'next/head';

export const getStaticPaths = async () => {
  const movies = await fetchAllMovies();
  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const movie = await fetchMovie(Number(id));

  return {
    props: { movie },
  };
};

export default function Movie({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <>
        <title>한입 시네마</title>
        <meta property='og:image' content='/thumnail.png' />
        <meta property='og:title' content='한입 시네마' />
        <meta
          property='og:description'
          content='한입 시네마에 등록된 영화들을 만나보세요'
        />
        <div>로딩중...</div>
      </>
    );
  if (!movie) return <div>문제가 발생했습니다. 다시 시도하세요</div>;

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <>
      <Head>
        <title>{title} - 한입 시네마</title>
        <meta property='og:image' content={posterImgUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} alt={title} />
        </div>
        <div>
          <h3>{title}</h3>
          <p>
            {releaseDate} / {''}
            {genres.join(',')}
            {''} / {runtime}분
          </p>
          <p>{company}</p>
          <b>{subTitle}</b>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
