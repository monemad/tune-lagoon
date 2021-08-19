import React from "react"
import { useSelector } from "react-redux"
import { Route, Link } from "react-router-dom"
import UserPage from "../UserPage"

const UsersPage = () => {
    const users = Object.values(useSelector(state => state.users))

    return (
        <>
            <Route exact path='/users'>
                <div className='users-div'>
                    {users.map(user => <div className='user-div' key={user.id}><Link to={`/users/${user.id}`}>{user.username}</Link></div>)}
                </div>
            </Route>
            <Route path='/users/:userId'>
                <UserPage users={users}/>
            </Route>
        </>
    )
}

export default UsersPage
