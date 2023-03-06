import { GetServerSideProps } from "next"

import Image from 'next/image'
import Link from 'next/link'

import { api } from "../services/api"

import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { convertDurationToTImeString } from "../utils/convertDurationToTimeString"

import styles from './home.module.scss';
import Head from "next/head"
import { PlayerContext } from "../contexts/PlayerContext"
import { useContext } from "react"

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  allEpisodes: Episode[];
  latestEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {

  const episodeList = [...latestEpisodes, ...allEpisodes];
  const { play }  = useContext(PlayerContext);

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Podcastr</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => (
            <li key={episode.id}>
              <img 
                width='150rem'
                height='150rem'
                src={episode.thumbnail} 
                alt={episode.title}
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`} passHref>
                  <p>{episode.title}</p>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button" onClick={() => play(episode)}>
                <img  
                  width='18rem'
                  height='18rem'
                  src="/play.png" 
                  alt="Tocar episódio"/>
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Publicado em</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {allEpisodes.map((episode, index) => (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <img 
                     width='18rem'  
                     height='18rem' 
                      src={episode.thumbnail} 
                      alt={episode.title}
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`} passHref>
                      <p>{episode.title}</p>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 150 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button"  onClick={() => play(episode)}>
                      <img  
                      width='18rem'  
                      height='18rem' 
                      src="/play.png" 
                      alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetServerSideProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode :any)=> ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { 
      locale: ptBR
    }),
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTImeString(Number(episode.file.duration)),
    url: episode.file.url,
  }))

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}