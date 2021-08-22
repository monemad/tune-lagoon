import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeSongFromPlaylist } from "../../store/playlists";
import { getUsers } from "../../store/users";
import SongContainer from '../SongContainer';
import "./PlaylistPage.css"

const PlaylistPage = () => {
    const playlists = Object.values(useSelector(state=>state.playlists));
    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const playlist = playlists.find(playlist => playlist.id === +playlistId);
    const [removeSong, setRemoveSong] = useState(false);
    const [songToRemove, setSongToRemove] = useState(false);

    const toggleRemovePrompt = id => {
        setRemoveSong(id ? true : false);
        setSongToRemove(id)
    }

    const removeFromPlaylist = e => {
        const payload = {
            songId: songToRemove,
            playlistId: +playlistId
        }
        dispatch(removeSongFromPlaylist(payload));
        dispatch(getUsers());
        setRemoveSong(false);
        setSongToRemove(false);
    }

    return (
        <> { playlist && 
            <div className='playlist-page'>
                <h2>{playlist.name}</h2>
                <p>Made by {playlist.User?.username}</p>
                <ul className='playlist-songs-list'>
                    {playlist.Songs?.map(song => 
                    <div key={song.id} className='playlist-song-container'>
                        { removeSong && song.id === songToRemove ?
                            <>
                                <span>Are you sure?</span>
                                <button onClick={removeFromPlaylist}>Yes</button>
                                <button onClick={e=>toggleRemovePrompt(false)}>No</button>
                            </>
                            :
                            <span onClick={e=>toggleRemovePrompt(song.id)}>⛔</span>
                        }
                        <SongContainer song={song} />
                    </div>)}
                </ul>
            </div>
        } </>
    )
}

export default PlaylistPage;
