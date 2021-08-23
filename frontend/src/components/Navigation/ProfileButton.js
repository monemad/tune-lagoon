

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <>
            
            <i className="fas fa-user" onClick={openMenu}></i>
            
            
            {showMenu && (
                <ul className="profile-dropdown">
                    <li><Link to={`/users/${user.id}`}>Profile</Link></li>
                    <li><Link to='/songs/liked'>Likes</Link></li>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
