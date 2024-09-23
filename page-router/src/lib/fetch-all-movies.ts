import { MovieData } from '@/types';

export default async function fetchAllMovies(q?: string): Promise<MovieData[]> {
  let url = `https://onbite-cinema-server.vercel.app/movie`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
