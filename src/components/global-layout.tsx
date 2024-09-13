import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import style from './global-layout.module.css';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onClickHeader = () => {
    router.push('/');
  };

  return (
    <div className={style.container}>
      <header onClick={onClickHeader}>
        <h1>ONEBITE CINEMA</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
