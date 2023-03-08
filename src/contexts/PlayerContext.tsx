import { createContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[ ];
    currentEpisodeIndex:  number;
    isPlaying: boolean;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    play: (episode: Episode) => void;
}

export const PlayerContext = createContext({ } as PlayerContextData);

export function PlayerContextProvider({ children }:any) {
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

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }
    return (

        <PlayerContext.Provider value={{currentEpisodeIndex, episodeList, play, isPlaying, togglePlay, setPlayingState}} >
            {children}
          </PlayerContext.Provider>  
    )
}