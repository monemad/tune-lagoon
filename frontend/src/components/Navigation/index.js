import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResZI, setSearchResZI] = useState(-1);

    document.querySelector('html').addEventListener('click', e=>setSearchResZI(-1));

    useEffect(()=>{
        if (!searchQuery.length) return setSearchResZI(-1);
        setSearchResZI(2);
    }, [searchQuery])

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <nav>
            <div className='nav home-div'>
                <NavLink exact to="/">Tune Lagoon</NavLink>
            </div>
            <div className='nav browse-div'>
                <NavLink to='/songs'>Stream</NavLink>
                <NavLink to='/users'>Discover</NavLink>
            </div>
            <div className='nav search-div'>
                <input 
                    className='search search-bar' 
                    placeholder='Search here...'
                    value={searchQuery}
                    onChange={e=>setSearchQuery(e.target.value)}/>
                <div 
                    className='search-results' 
                    onClick={e=>e.stopPropagation()}
                    style={{zIndex: searchResZI}}>

                </div>
            </div>
            <div className='nav session-div'>
                {sessionUser && <NavLink to='/upload'>Upload</NavLink>}
                {isLoaded && sessionLinks}
            </div>
        </nav>
    );
}

export default Navigation;
