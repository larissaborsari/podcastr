import type { AppProps } from 'next/app'
import Head from 'next/head';
import Header from '../components/Header';
import "../styles/global.scss"
import styles from '../styles/app.module.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header></Header>
        <Component {...pageProps} />
      </main>
    </div>
    
  );
}
