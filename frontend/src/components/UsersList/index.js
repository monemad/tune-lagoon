import React from "react"
import { Route, Link } from "react-router-dom"
import UserPage from "../UserPage"

const UsersList = ({ users }) => {

    return (
        <>
            <Route exact path='/users'>
                <div className = 'users-div'>
                    <ul>
                        {users.map(user => <li key={user.id}><Link to={`/users/${user.id}`}>{`${user.username}`}</Link></li>)}
                    </ul>
                </div>
            </Route>
            <Route path='/users/:userId'>
                <UserPage users={users}/>
            </Route>
        </>
    )
}

export default UsersList
