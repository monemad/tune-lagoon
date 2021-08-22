import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Route, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import EditUserDetails from '../EditUserDetails';
import CreatePlaylistForm from '../CreatePlaylistForm';
import SongContainer from '../SongContainer';
import { destroyPlaylist } from '../../store/playlists';
import { getUsers } from '../../store/users';

const UserPage = ({ users }) => {
    const session = useSelector(state => state.session);
    const { userId } = useParams();
    const user = users.find(user => user.id === +userId)
    const authorized = user && session.user.id === user.id;
    const dispatch = useDispatch();

    const deletePlaylist = (e) => {
        console.log('implement delete');
        dispatch(destroyPlaylist(e.target.id));
        dispatch(getUsers());
    }

    return (
        <> { user && 
            <div className='user-page'>
                <h2>{user.username}</h2>
                <div className='user-details'>
                    <p>{user.firstName} {user.lastName}</p>
                    { authorized && <>
                        <Link to={`/users/${user.id}/edit`}>Edit Profile</Link>
                        <Route path='/users/:userId/edit'>
                            <EditUserDetails user={user}/>
                        </Route>
                    </> }
                </div>
                <div className='user-songs'>
                    <h3>Songs</h3>
                    {user.Songs.map(song => <SongContainer key={song.id} song={song} />)}
                </div>
                <div className='user-playlists'>
                    <h3>Playlists</h3>
                    {user.Playlists.map(playlist => <div className='playlist-div' key={playlist.id}><Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link><span>{playlist.Songs.length} songs</span><span id={playlist.id} onClick={deletePlaylist}>delete</span></div>)}
                    { authorized && <>
                        <Link to={`/users/${user.id}/create-playlist`}><button>Create a Playlist</button></Link>
                        <Route path='/users/:userId/create-playlist'>
                            <CreatePlaylistForm user={user}/>
                        </Route>
                    </> }
                </div>
                <div className='links'>
                    <Link className='link-to-users' to='/users'>Back to all users</Link>
                </div>
            </div>
        } </>
    )
}

export default UserPage;
