import { createContext, ReactNode, useState } from 'react';

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
    playList: (list: Episode[], index: number) => void;
}

type PlayerContextProviderProps = {
    children: ReactNode
}

export const PlayerContext = createContext({ } as PlayerContextData);

export function PlayerContextProvider({ children }:PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState<any>([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
    }

    function playList(list : Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
    setIsPlaying(!isPlaying);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function playNext() {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
    return (

        <PlayerContext.Provider 
            value={{
                currentEpisodeIndex,
                 episodeList,
                  play, 
                  isPlaying, 
                  togglePlay, 
                  setPlayingState,
                  playList
                  }} >
            {children}
          </PlayerContext.Provider>  
    )
}