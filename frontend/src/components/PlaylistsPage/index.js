import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PlaylistPage from "../PlaylistPage";

const PlaylistsPage = () => {
    const playlists = Object.values(useSelector(state => state.playlists));

    return (
        <>
            <Route exact path = '/playlists'>
                <div className='playlists-page'>
                    <h2>Playlists</h2>
                    <ul className='playlists-list'>
                        {playlists.map(playlist => <li className='playlists-list-item' key={playlist.id}><Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link></li>)}
                    </ul>
                </div>
            </Route>
            <Route path='/playlists/:playlistId'>
                <PlaylistPage playlists={playlists}/>
            </Route>
        </>
    )
}

export default PlaylistsPage;
