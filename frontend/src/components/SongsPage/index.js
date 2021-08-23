import { Route } from "react-router-dom"
import { useSelector } from "react-redux";
import SongPage from "../SongPage";
import LikedSongsPage from "../LikedSongsPage";
import SongContainer from "../SongContainer";

const SongsPage = () => {
    const songs = Object.values(useSelector(state => state.songs));

    return (
        <>
            <Route exact path='/songs'>
                <div className='songs-page'>
                    <h2>Songs</h2>
                    {songs.map(song => <SongContainer key={song.id} song={song} />)}
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
