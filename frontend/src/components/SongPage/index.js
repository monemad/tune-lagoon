import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import CommentContainer from "../CommentContainer"
import {  useNowPlaying } from "../../context/NowPlayingContext";
import { addSongToPlaylist } from "../../store/playlists"
import { addCommentToSong, destroyComment, destroySong } from "../../store/songs"
import { getUsers } from "../../store/users";
import { getPlaylists } from "../../store/playlists";
import "./SongPage.css"

const SongPage = ({ songs }) => {
    const [playlistId, setPlaylistId] = useState("")
    const [comment, setComment] = useState("");
    const [commentToDelete, setCommentToDelete] = useState(false);
    const [deleteCommentPrompt, setDeleteCommentPrompt] = useState(false);
    const [deleteSongPrompt, setDeleteSongPrompt] = useState(false);
    const { nowPlaying, setNowPlaying } = useNowPlaying();
    const session = useSelector(state => state.session)
    const playlists = Object.values(useSelector(state=>state.playlists))
    const users = Object.values(useSelector(state => state.users));
    const { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

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

    const addComment = e => {
        const player = document.querySelector('audio');
        e.preventDefault();
        let timeElapsed = player.src === song.songUrl ? parseInt(player.currentTime) : -1
        if (player.paused && (timeElapsed === 0 || timeElapsed === song.length)) timeElapsed = -1;
        console.log(player.paused)
        const payload = {
            content: comment,
            userId: session.user?.id,
            songId: +songId,
            timeElapsed
        }
        dispatch(addCommentToSong(payload))
        console.log("Comment:", payload);
        setComment('');
    }

    const toggleDeleteSongPrompt = id => {
        setDeleteSongPrompt(id ? true : false);
    }

    const deleteSong = async e => {
        await dispatch(destroySong(+songId));
        await dispatch(getUsers());
        await dispatch(getPlaylists());
        history.push('/songs')
    }

    const toggleDeleteCommentPrompt = id => {
        setDeleteCommentPrompt(id ? true : false);
        setCommentToDelete(id)
    }
    
    const deleteComment = async e => {
        await dispatch(destroyComment(commentToDelete));
        await dispatch(getUsers());

        setDeleteCommentPrompt(false);
        setCommentToDelete(false);
        
    }

    return (
        <> { song && 
            <div className='song-page'>
                <h2>{song.title}</h2>
                <p>Uploaded by <Link to={`/users/${song.userId}`}>{users?.find(user => user.id === song.userId).username}</Link></p>
                { nowPlaying !== song.songUrl ? <button onClick={e=>setNowPlaying(song.songUrl)}>Play</button> : <button onClick={e=>setNowPlaying('')}>Stop Playing</button>}
                <p>{likes} likes</p>
                { authorized && 
                    <button>DeleteSong</button>
                }
                { deleteSongPrompt ?
                    <>
                        <span>Are you sure?</span>
                        <button onClick={deleteSong}>Yes</button>
                        <button onClick={e=>toggleDeleteSongPrompt(false)}>No</button>
                    </>
                    :
                    song.userId === session.user?.id && <button onClick={e=>toggleDeleteSongPrompt(+songId)}>Delete Song</button>
                }
                { authenticated && validPlaylists.length &&
                    <form onSubmit={addSongToPL}>
                        <div>
                            <label htmlFor='playlist'>Add to playlist: </label>
                            <select id='playlist' value={playlistId} onChange={e=>setPlaylistId(e.target.value)} required>
                                <option value="">Choose a playlist</option>
                                {validPlaylists.map(playlist => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)}
                            </select>
                        </div>
                        <button>Submit</button>
                    </form>
                }
                <div className='song-comments'>
                    <h3>Comments</h3>
                    {song.Comments.map(comment => 
                        <div key={comment.id} className='comment-container-div'>
                            { deleteCommentPrompt && comment.id === commentToDelete ?
                                <>
                                    <span>Are you sure?</span>
                                    <button onClick={deleteComment}>Yes</button>
                                    <button onClick={e=>toggleDeleteCommentPrompt(false)}>No</button>
                                </>
                                :
                                comment.userId === session.user?.id && <span onClick={e=>toggleDeleteCommentPrompt(comment.id)}>⛔</span>
                            }
                            <CommentContainer key={comment.id} comment={comment} setNowPlaying={setNowPlaying} songUrl={song.songUrl}/>
                        </div>)}
                    { authenticated &&
                        <form onSubmit={addComment}>
                            <div>
                                <input id='comment' value={comment} onChange={e=>setComment(e.target.value)} placeholder='Add a comment' required/>
                            </div>
                            <button>Add comment</button>
                        </form>
                    }
                </div>
            </div>
        } </>
    )
}

export default SongPage;
