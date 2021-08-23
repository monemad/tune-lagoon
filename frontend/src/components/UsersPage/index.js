import React from "react"
import { useSelector } from "react-redux"
import { Route, Link } from "react-router-dom"
import UserPage from "../UserPage"
import "./UsersPage.css"

const UsersPage = () => {
    const users = Object.values(useSelector(state => state.users))

    return (
        <>
            <Route exact path='/users'>
                <div className='users-div'>
                    <h2>Users</h2>
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
