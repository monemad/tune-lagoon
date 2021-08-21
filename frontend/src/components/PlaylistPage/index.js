import { Link, useParams } from "react-router-dom";

const PlaylistPage = ({ playlists }) => {
    const { playlistId } = useParams();
    const playlist = playlists.find(playlist => playlist.id === +playlistId);

    return (
        <> { playlist && 
            <div className='playlist-page'>
                <h2>{playlist.name}</h2>
                <p>Made by {playlist.User?.username}</p>
                <ul className='playlist-songs-list'>
                    {playlist.Songs?.map(song => <li className='playlist-songs-list-item' key={song.id}><Link to={`/songs/${song.id}`}>{song.title}</Link></li>)}
                </ul>
            </div>
        } </>
    )
}

export default PlaylistPage;
