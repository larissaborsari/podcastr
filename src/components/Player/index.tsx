import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'


export default function Player() {

    const audioRef =  useRef<HTMLAudioElement>(null)

    const {currentEpisodeIndex, episodeList, isPlaying, togglePlay } = useContext(PlayerContext);
    const episode = episodeList[currentEpisodeIndex];

    useEffect(( ) => {
        if (!audioRef.current)
        {
            return;
        }
        if (isPlaying)
        {
            audioRef.current.play();
        }
        else 
        {
            audioRef.current.pause();
        }
    }, [isPlaying])

    return (
        <div className={styles.playerContainer}>

            <header>
                <strong>    Tocando Agora </strong>
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

            <footer className={!episode ? styles.empty : ' '}>

                <div className={styles.progess}>

                    <span>00:00</span>
                    <div className={styles.slider}>
                        { episode ? 
                        ( 
                            <Slider 
                            trackStyle = {{ backgroundColor: '#04d361'}}
                            railStyle = {{backgroundColor: '#9f75ff'}}
                            handleStyle = {{borderColor: '#04d361', borderWidth: 4}}
                            />
                         ) : ( 
                            <div className={styles.emptySlider}/>
                        )}
                

                    </div>

                    <span>00:00</span>

                </div>

                { episode && (
                    <audio 
                    src={episode.url}
                    ref={audioRef}
                    autoPlay
                    />
                    
                )}

                <div className={styles.buttons}>
                    
                    <button type='button' disabled={!episode}>
                        <img src="/shuffle.png" alt="Embaralhar" width='18rem' />
                    </button>

                    <button type='button' disabled={!episode}>
                        <img src="/play-previous.png" alt="Tocar anterior" width='18rem'/>
                    </button>

                    <button type='button' className={styles.playButton} disabled={!episode} onClick={togglePlay}>
                        { isPlaying ? <img src="/pause.png" alt='Parar' width= '20rem'/> : <img src="/play.png" alt="Tocar" width='20rem'/>}
                    </button>

                    <button type='button' disabled={!episode}>
                        <img src="/play-next.png" alt="Tocar próxima" width='18rem' />
                    </button>

                    <button type='button' disabled={!episode}>
                        <img src="/repeat.png" alt="Repetir" width='18rem'/>
                    </button>

                </div>
            </footer>
        </div>
    );
};