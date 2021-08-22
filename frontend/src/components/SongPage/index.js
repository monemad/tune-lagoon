import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {  useNowPlaying } from "../../context/NowPlayingContext";

const SongPage = ({ songs }) => {
    const { nowPlaying, setNowPlaying } = useNowPlaying();
    const sessionUser = useSelector(state => state.session.user)
    const users = Object.values(useSelector(state => state.users));
    const { songId } = useParams();
    const song = songs.find(song => song.id === +songId);
    const likes = song && song.SongVotes.reduce((accum, vote) => vote.Song_Vote.liked ? accum + 1 : accum - 1, 0);
    const authorized = sessionUser?.id === song?.userId

    return (
        <> { song && 
            <div className='song-page'>
                <h2>{song.title}</h2>
                <p>Uploaded by <Link to={`/users/${song.userId}`}>{users?.find(user => user.id === song.userId).username}</Link></p>
                { nowPlaying !== song.songUrl ? <p onClick={e=>setNowPlaying(song.songUrl)}>Play</p> : <p>Currently Playing</p>}
                <p>{likes} likes</p>
                {authorized && <p>Delete Song</p>}
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
