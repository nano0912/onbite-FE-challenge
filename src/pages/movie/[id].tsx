import { useRouter } from 'next/router';

export default function Movie() {
  const router = useRouter();

  const { id } = router.query;

  return <h1>{id} 영화 상세페이지</h1>;
}
