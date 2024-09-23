import { MovieData } from '@/types';

export default async function fetchMovie(
  id: number
): Promise<MovieData | null> {
  const url = `https://onbite-cinema-server.vercel.app/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
