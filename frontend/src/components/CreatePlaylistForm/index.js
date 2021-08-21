import { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../store/playlists";
import { getUsers } from "../../store/users";


const CreatePlaylistForm = ({ user }) => {

    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        const payload = {
            name,
            userId: user.id,
            private: isPrivate
        }
        console.log(payload)
        setErrors([]);
        dispatch(createPlaylist(payload))
            .then(() => {
                dispatch(getUsers());
                history.push(`/users/${user.id}`);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        
    }
    
    return (
        <>
            <div className='create-playlist'>
                <form onSubmit={submitHandler}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div>
                        <label htmlFor='name'>Playlist Name: </label>
                        <input id='name' value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor='private'>Private: </label>
                        <input id='private' type='checkbox' checked={isPrivate} onChange={e => setIsPrivate(!isPrivate)}></input>
                    </div>
                    <button>Create</button>
                </form>
                <Link to={`/users/${user.id}`}>Cancel</Link>
            </div>
        </>
    )
}

export default CreatePlaylistForm
