import { Inter } from '@next/font/google'
import { GetStaticProps  } from 'next';
import { api } from '../services/api';

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
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
};
