import { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";


const CreatePlaylistForm = ({ user }) => {

    const [name, setName] = useState('');

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        const payload = {
            id: user.id,
            name
        }
        console.log(payload)
        setErrors([]);
        // dispatch(updateUserProfile(payload))
        //     .then(() => history.push(`/users/${user.id}`))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     });
        
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
                    <button>Create</button>
                </form>
                <Link to={`/users/${user.id}`}>Cancel</Link>
            </div>
        </>
    )
}

export default CreatePlaylistForm
