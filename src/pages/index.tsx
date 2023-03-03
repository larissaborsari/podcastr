import { Inter } from '@next/font/google'
import { GetStaticProps  } from 'next';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import  ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTImeString } from '../utils/convertDurationToTimeString';

const inter = Inter({ subsets: ['latin'] });

type Episode = {
    id: string;
    title: string;
    members: string;
    published_at: string;
    thumbnail: string;
    description: string;
    file: {
      url: string;
      type: string;
      duration: number;
    };
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
  })

const episodes = data.map((e:Episode) => {
  return {
    id: e.id,
    title: e.title,
    thumbnail: e.thumbnail,
    members: e.members,
    publishedAt: format(parseISO(e.published_at), 'd MMM yy', { locale: ptBR}),
    duration: Number(e.file.duration),
    durationAsString: convertDurationToTImeString(Number(e.file.duration)),
    description: e.description,
    url: e.file.url,
  }
})

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8
  }
};
