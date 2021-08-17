import React from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const UserPage = ({ users }) => {
    const { userId } = useParams();
    const user = users.find(user => user.id === +userId)

    return (
        <div className='user-page'>
            <h2>{user.username}</h2>
            <div className='user-details'>
                <span>{user.firstName} {user.lastName}</span>
            </div>
            <div className='links'>
                <Link className='link-to-users' to='/users'>Back to all users</Link>
            </div>
        </div>
    )
}

export default UserPage;
