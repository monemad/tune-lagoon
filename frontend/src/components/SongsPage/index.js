import { Link, Route } from "react-router-dom"
import { useSelector } from "react-redux";
import SongPage from "../SongPage";
import LikedSongsPage from "../LikedSongsPage";

const SongsPage = () => {
    const songs = Object.values(useSelector(state => state.songs));

    return (
        <>
            <Route exact path='/songs'>
                <div className='songs-page'>
                    <ul className='songs-list'>
                        {songs.map(song => <li key={song.id}><Link to={`/songs/${song.id}`}>{song.title}</Link></li>)}
                    </ul>
                </div>
            </Route>
            <Route path='/songs/:songId'>
                <SongPage songs={songs}/>
            </Route>
            <Route path='/songs/liked'>
                <LikedSongsPage songs={songs}/>
            </Route>
        </>
    )
}

export default SongsPage;
