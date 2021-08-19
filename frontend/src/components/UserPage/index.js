import React from 'react'
import { useSelector } from 'react-redux';
import { Route, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import EditUserDetails from '../EditUserDetails';

const UserPage = ({ users }) => {
    const session = useSelector(state => state.session);
    const { userId } = useParams();
    const user = users.find(user => user.id === +userId)
    const authorized = user && session.user.id === user.id;

    return (
        <> { user && 
            <div className='user-page'>
                <h2>{user.username}</h2>
                <div className='user-details'>
                    <p>{user.firstName} {user.lastName}</p>
                    { authorized && <><Link to={`/users/${user.id}/edit`}>Edit Profile</Link>
                    <Route path='/users/:userId/edit'>
                        <EditUserDetails user={user}/>
                    </Route></> }
                </div>
                <div className='user-songs'>
                    <h3>Songs</h3>
                    {user.Songs.map(song => <div className='song-div' key={song.id}><Link to={`/songs/${song.id}`}>{song.title}</Link></div>)}
                </div>
                <div className='user-playlists'>
                    <h3>Playlists</h3>
                    {user.Playlists.map(playlist => <div className='playlist-div' key={playlist.id}><Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link><span>{playlist.Songs.length} songs</span></div>)}
                </div>
                <div className='links'>
                    <Link className='link-to-users' to='/users'>Back to all users</Link>
                </div>
            </div>
        } </>
    )
}

export default UserPage;
