import { Inter } from '@next/font/google'
import { GetStaticProps  } from 'next';

const inter = Inter({ subsets: ['latin'] });

type Episode = {
  episodes: Array<{
    id: string,
    title: string,
    members: string,
    //...
  }>
}

type HomeProps = {
  episodes: Array<Episode>
}

export default function Home(props: HomeProps) {
  return (
    <>
       <p>index</p> 
       <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
};

export  const  getStaticProps: GetStaticProps= async() =>{
  const response = await fetch('http://localhost:3333/episodes?_limit=12&_sort=published_at&_order=desc');
  const data = await response.json();

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
};
