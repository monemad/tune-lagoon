import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const SongPage = ({ songs }) => {
    const users = Object.values(useSelector(state => state.users));
    const { songId } = useParams();
    const song = songs.find(song => song.id === +songId);
    const likes = song && song.SongVotes.reduce((accum, vote) => vote.Song_Vote.liked ? accum + 1 : accum - 1, 0);

    return (
        <> { song && 
            <div className='song-page'>
                <h2>{song.title}</h2>
                <p>Uploaded by <Link to={`/users/${song.userId}`}>{users.find(user => user.id === song.userId).username}</Link></p>
                <p>{likes} likes</p>
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
