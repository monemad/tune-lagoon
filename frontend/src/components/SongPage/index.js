import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {  useNowPlaying } from "../../context/NowPlayingContext";
import { addSongToPlaylist } from "../../store/playlists"
import { getUsers } from "../../store/users";

const SongPage = ({ songs }) => {
    const [playlistId, setPlaylistId] = useState("")
    const { nowPlaying, setNowPlaying } = useNowPlaying();
    const session = useSelector(state => state.session)
    const playlists = Object.values(useSelector(state=>state.playlists))
    const users = Object.values(useSelector(state => state.users));
    const { songId } = useParams();
    const dispatch = useDispatch();

    const song = songs.find(song => song.id === +songId);
    const likes = song && song.SongVotes.reduce((accum, vote) => vote.Song_Vote.liked ? accum + 1 : accum - 1, 0);
    const authenticated = session?.user
    const authorized = session?.user?.id === song?.userId
    const userPlaylists = playlists?.filter(playlist => playlist.userId === session?.user?.id);
    const validPlaylists = userPlaylists?.filter(playlist => {
        let canAddToPlaylist = true;
        playlist.Songs.forEach(song => {
            if (song.id === +songId) canAddToPlaylist = false;
        })
        return canAddToPlaylist;
    });

    const addSongToPL = e => {
        e.preventDefault();
        const payload = {
            playlistId: +playlistId,
            songId: +songId
        }
        console.log(payload);
        dispatch(addSongToPlaylist(payload));
        dispatch(getUsers())
        setPlaylistId("");
    }

    return (
        <> { song && 
            <div className='song-page'>
                <h2>{song.title}</h2>
                <p>Uploaded by <Link to={`/users/${song.userId}`}>{users?.find(user => user.id === song.userId).username}</Link></p>
                { nowPlaying !== song.songUrl ? <p onClick={e=>setNowPlaying(song.songUrl)}>Play</p> : <p>Currently Playing</p>}
                <p>{likes} likes</p>
                { authorized && 
                    <p>Delete Song</p>
                }
                { authenticated &&
                    <form onSubmit={addSongToPL}>
                        <div>
                            <label htmlFor='playlist'>Add to playlist: </label>
                            <select name='playlist' id='playlist' value={playlistId} onChange={e=>setPlaylistId(e.target.value)} required>
                                <option value="">Choose a playlist</option>
                                {validPlaylists.map(playlist => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)}
                            </select>
                        </div>
                        <button>Submit</button>
                    </form>
                }
                <div className='song-comments'>
                    <h3>Comments</h3>
                    <ul className='song-comments-div'>
                        {song && song.Comments.map(comment => <li key={comment.id}>{comment.content}<span className='comment-author'> -<Link to={`/users/${comment.userId}`}>{comment.User.username}</Link></span></li>)}
                    </ul>
                </div>
            </div>
        } </>
    )
}

export default SongPage;
