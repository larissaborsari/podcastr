import {  useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { convertDurationToTImeString } from '../../utils/convertDurationToTimeString';


export default function Player() {

    const audioRef =  useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    const {
        currentEpisodeIndex, 
        episodeList, 
        isPlaying,
        togglePlay, 
        setPlayingState, 
        playNext, 
        playPrevious, 
        hasNext,
        hasPrevious, 
        isLooping,
        toggleLoop,
        toggleShuffle,
        isShuffling,
        clearPlayerState,
    } = usePlayer();
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

    function setUpProgressListener() {
        if(audioRef.current) {
            audioRef.current.currentTime = 0;

            audioRef.current?.addEventListener('timeupdate', () => {
                setProgress(audioRef.current ? Math.floor(audioRef.current.currentTime): 0)
            })
        }
    }

    function handleSeek(amount : number) {
        if(audioRef.current) {
            audioRef.current.currentTime = amount;
            setProgress(amount)
        }
    }

    function handleEpisodeEnded() {
        if (hasNext){
            playNext();
        } else {
            clearPlayerState();
        }
    }

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

                <span>{convertDurationToTImeString(progress)}</span>
                    <div className={styles.slider}>
                        { episode ? 
                        ( 
                            <Slider 
                            trackStyle = {{ backgroundColor: '#04d361'}}
                            railStyle = {{backgroundColor: '#9f75ff'}}
                            handleStyle = {{borderColor: '#04d361', borderWidth: 4}}
                            max={episode.duration}
                            value={progress}
                            onChange={handleSeek}
                            />
                         ) : ( 
                            <div className={styles.emptySlider}/>
                        )}
                

                    </div>

                    <span>{convertDurationToTImeString(episode?.duration ?? 0)}</span>

                </div>

                { episode && (
                    <audio 
                    src={episode.url}
                    ref={audioRef}
                    loop={isLooping}
                    autoPlay
                    onEnded={handleEpisodeEnded}
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    onLoadedMetadata={setUpProgressListener}
                    />
                    
                )}

                <div className={styles.buttons}>
                    
                    <button type='button' disabled={!episode || episodeList.length === 1} onClick={toggleShuffle} className={ isShuffling ? styles.isActive : ""}>
                        <img src="/shuffle.png" alt="Embaralhar" width='18rem' />
                    </button>

                    <button type='button' disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/play-previous.png" alt="Tocar anterior" width='18rem'/>
                    </button>

                    <button type='button' className={styles.playButton} disabled={!episode} onClick={togglePlay}>
                        { isPlaying ? <img src="/pause.png" alt='Parar' width= '20rem'/> : <img src="/play.png" alt="Tocar" width='20rem'/>}
                    </button>

                    <button type='button' disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.png" alt="Tocar próxima" width='18rem' />
                    </button>

                    <button type='button' disabled={!episode} onClick={toggleLoop} className={ isLooping ? styles.isActive : ''}>
                        <img src="/repeat.png" alt="Repetir" width='18rem'/>
                    </button>

                </div>
            </footer>
        </div>
    );
};