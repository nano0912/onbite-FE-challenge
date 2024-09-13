import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function Search() {
  const router = useRouter();

  const { q } = router.query;

  return <h2>검색 결과 : {q}</h2>;
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
