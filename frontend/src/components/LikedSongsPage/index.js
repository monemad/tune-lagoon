import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LikedSongsPage = ({ songs }) => {
    const session = useSelector(state => state.session)
    const users = Object.values(useSelector(state => state.users));
    const user = users && users.find(user => user.id === session.user.id);
    const likedSongs = user && user.LikedSongs.filter(song => song.Song_Vote.liked)

    return (
        <>
            <div className='liked-songs-page'>
                <h2>Your Liked Songs</h2>
                <ul className='liked-songs-list'>
                    {likedSongs && likedSongs.map(song => <li key={song.id}><Link to={`/songs/${song.id}`}>{song.title}</Link></li>)}
                </ul>
            </div>
        </>
    )
}

export default LikedSongsPage;
