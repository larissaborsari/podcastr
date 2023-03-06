import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';


export default function Player() {

    const {currentEpisodeIndex, episodeList } = useContext(PlayerContext);
    const episode = episodeList[currentEpisodeIndex];

    return (
        <div className={styles.playerContainer}>

            <header>
                <img src="/playing.png" alt="Tocando agora" width="30px" />
                <strong>Tocando Agora </strong>
            </header>

          { episode ? (
            <div className={styles.currentEpisode}> 
                <img width={250} height={250} src={episode.thumbnail} />
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
            </div>
          ) : (  
            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>
            ) }

            <footer className={styles.empty}>
                <div className={styles.progess}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                    <div className={styles.emptySlider}/>
                    </div>
                    <span>00:00</span>
                </div>
                <div className={styles.buttons}>
                    <button type='button'>
                        <img src="/shuffle.png" alt="Embaralhar" width='18rem' />
                    </button>
                    <button type='button'>
                        <img src="/play-previous.png" alt="Tocar anterior" width='18rem'/>
                    </button>
                    <button type='button' className={styles.playButton}>
                        <img src="/play.png" alt="Tocar" width='20rem'/>
                    </button>
                    <button type='button'>
                        <img src="/play-next.png" alt="Tocar próxima" width='18rem' />
                    </button>
                    <button type='button'>
                        <img src="/repeat.png" alt="Repetir" width='18rem'/>
                    </button>
                </div>
            </footer>
        </div>
    );
};