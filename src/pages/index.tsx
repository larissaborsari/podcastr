import { Inter } from '@next/font/google'
import { useEffect } from 'react'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  return (
    <>
       <p>index</p>
       <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
};
