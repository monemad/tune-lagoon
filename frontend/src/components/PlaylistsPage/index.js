import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PlaylistPage from "../PlaylistPage";

const PlaylistsPage = () => {
    return (
        <>
            <Route exact path = '/playlists'>
                Playlists Page
            </Route>
            <Route path='/playlists/:playlistId'>
                <PlaylistPage />
            </Route>
        </>
    )
}

export default PlaylistsPage;
