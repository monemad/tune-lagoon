import { Link } from "react-router-dom"
import { useNowPlaying } from "../../context/NowPlayingContext"
import "./SongContainer.css"

const SongContainer = ({ song }) => {
    const { nowPlaying, setNowPlaying } = useNowPlaying();

    const formatSongLength = length => {
        let hours = `${parseInt(length / 3600)}`;

        let minutes = `${parseInt(length / 60)}`;
        while (minutes >= 60) minutes-=60;
        if (hours > 0 && minutes < 10) minutes = `0${minutes}`
        
        let seconds = `${parseInt(length % 60)}`;
        if (seconds < 10) seconds = `0${seconds}`
        
        if (hours > 0) return `${hours}:${minutes}:${seconds}`;
        return `${minutes}:${seconds}`
    }

    return (
        <>
            {song && <div className='song-div'>
                <div className='song-details-div'>
                    <span className='song-details song-name'><Link to={`/songs/${song.id}`}>{song.title}</Link></span>
                    <span className='song-details song-length'>{formatSongLength(song.length)}</span>
                    {/* <span className='song-details song-length'>{song.length}</span> */}
                </div>
                <div className='waveform'>
                    🌊🌊🌊🌊🌊🌊
                </div>
                <div className='playback'>
                    {nowPlaying !== song.songUrl ? <i className="fas fa-play" onClick={e=>setNowPlaying(song.songUrl)}></i> : <i className="fas fa-stop" onClick={e=>setNowPlaying('')}></i>}
                </div>
            </div>}
        </>
    )
}

export default SongContainer;
