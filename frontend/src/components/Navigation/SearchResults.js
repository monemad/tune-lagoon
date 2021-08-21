import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchResults = ({ searchQuery, searchResZI, setSearchResZI }) => {
    const state = useSelector(state => state);
    const users = Object.values(state.users);
    const songs = Object.values(state.songs);
    const playlists = Object.values(state.playlists);

    const usersResults = users?.filter(user => user.username?.toUpperCase().includes(searchQuery?.toUpperCase()));

    const songsResults = songs?.filter(song => song.title?.toUpperCase().includes(searchQuery?.toUpperCase()));

    const playlistsResults = playlists?.filter(playlist => playlist.name?.toUpperCase().includes(searchQuery?.toUpperCase()));

    const formatResult = result => {
        const index = result.toUpperCase().indexOf(searchQuery?.toUpperCase());
        const len = searchQuery.length;

        const subStringOne = result.slice(0, index);
        const match = result.slice(index, index + len);
        const subStringTwo = result.slice(index+len);

        return (
            <span>{subStringOne}<span className='match'>{match}</span>{subStringTwo}</span>
        )
    }


    return (
        <div 
        className='search-results' 
        onClick={e=>e.stopPropagation()}
        style={{zIndex: searchResZI}}>
            <div className='users-results'>
                <h4>Users:</h4>
                <ul>
                    {usersResults.length ? usersResults.map(user => <li key={`user${user.id}`}><Link to={`/users/${user.id}`} onClick={e=>setSearchResZI(-1)}>{formatResult(user.username)}</Link></li>) : <li>No users found</li>}      
                </ul>
            </div>
            <div className='songs-results'>
                <h4>Songs:</h4>
                <ul>
                    {songsResults.length ? songsResults.map(song => <li key={`song${song.id}`}><Link to={`/songs/${song.id}`} onClick={e=>setSearchResZI(-1)}>{formatResult(song.title)}</Link></li>) : <li>No songs found</li>}      
                </ul>
            </div>
            <div className='playlists-results'>
                <h4>Playlists:</h4>
                <ul>
                    {playlistsResults.length ? playlistsResults.map(playlist => <li key={`playlist${playlist.id}`}><Link to={`/playlists/${playlist.id}`} onClick={e=>setSearchResZI(-1)}>{formatResult(playlist.name)}</Link></li>) : <li>No playlists found</li>}      
                </ul>     
            </div>
        </div>
    )
}

export default SearchResults;
