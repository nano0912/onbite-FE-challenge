import fetchMovie from '@/lib/fetch-movie';
import style from './[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import fetchAllMovies from '@/lib/fetch-all-movies';

export const getStaticPaths = async () => {
  const movies = await fetchAllMovies();
  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: true, // NOTE 새로운 경로가 추가되면 다시 빌드해야하므로 true
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

  if (router.isFallback) return <div>로딩중...</div>;
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
  );
}
