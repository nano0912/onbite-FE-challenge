import fetchMovie from '@/lib/fetch-movie';
import style from './[id].module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;

  const movie = await fetchMovie(Number(id));

  return {
    props: { movie },
  };
};

export default function Movie({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) return <div></div>;

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
