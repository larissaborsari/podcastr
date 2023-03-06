import type { AppProps } from 'next/app'
import Head from 'next/head';
import Header from '../components/Header';
import "../styles/global.scss"
import styles from '../styles/app.module.scss'
import Player from '../components/Player';
import { PlayerContext } from '../contexts/PlayerContext'
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {

const [episodeList, setEpisodeList] = useState<any>([]);
const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);

function play(episode: any) {
  setEpisodeList([episode]);
  setCurrentEpisodeIndex(0);
  setIsPlaying(true);
}

function togglePlay() {
  setIsPlaying(!isPlaying);
}

  return (

    <PlayerContext.Provider value={{currentEpisodeIndex, episodeList, play, isPlaying, togglePlay}}>
    <div className={styles.wrapper}>
      <main>
          <Header/>
        <Component {...pageProps} />
      </main>
      <Player/>
    </div>
    </PlayerContext.Provider>
  );
}
