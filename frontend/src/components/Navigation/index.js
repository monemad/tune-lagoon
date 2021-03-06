import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchResults from './SearchResults';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResVis, setSearchResVis] = useState(false);

    document.querySelector('html').addEventListener('click', e=>setSearchResVis(false));

    useEffect(()=>{
        if (!searchQuery.length) return setSearchResVis(false);
        setSearchResVis(true);
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

    const handleSearchBarClick = e => {
        e.stopPropagation();
    }

    return (
        <nav>
            <div className='nav home-div'>
                <Link to="/"><img src='/favicon-32x32.png' alt='logo'></img></Link>
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
                    onChange={e=>setSearchQuery(e.target.value)}
                    onClick={handleSearchBarClick}/>
                {searchResVis && <SearchResults searchQuery={searchQuery} setSearchResVis={setSearchResVis}/>}
            </div>
            <div className='nav session-div'>
                {sessionUser && <NavLink to='/upload'>Upload</NavLink>}
                {isLoaded && sessionLinks}
            </div>
        </nav>
    );
}

export default Navigation;
