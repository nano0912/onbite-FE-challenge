import { ReactNode } from 'react';
import style from './global-layout.module.css';
import Link from 'next/link';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header>
        <h1>
          <Link href={'/'}>ONEBITE CINEMA</Link>
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
