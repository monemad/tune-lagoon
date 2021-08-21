import { createContext, useContext, useState } from 'react';

export const NowPlayingContext = createContext();

export const useNowPlaying = () => useContext(NowPlayingContext);

export default function NowPlayingProvider({ children }) {
    const [nowPlaying, setNowPlaying] = useState("");

    return (
        <NowPlayingContext.Provider
        value={{
            nowPlaying,
            setNowPlaying
        }}
        >
        {children}
        </NowPlayingContext.Provider>
    );
}
