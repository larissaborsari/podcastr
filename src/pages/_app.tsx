import type { AppProps } from 'next/app'
import Head from 'next/head';
import Header from '../components/Header';
import "../styles/global.scss"
import styles from '../styles/app.module.scss'
import Player from '../components/Player';
import { PlayerContext } from '../contexts/PlayerContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayerContext.Provider value={{currentEpisodeIndex: 0, episodeList: []}}>
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
