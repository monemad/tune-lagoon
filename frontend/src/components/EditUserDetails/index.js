import { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/users";


const EditUserDetails = ({ user }) => {

    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        const payload = {
            id: user.id,
            username,
            firstName,
            lastName
        }
        setErrors([]);
        dispatch(updateUserProfile(payload))
            .then(() => history.push(`/users/${user.id}`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        
    }
    
    return (
        <>
            <div className='edit-user-details'>
                <form onSubmit={submitHandler}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div>
                        <label htmlFor='username'>Username: </label>
                        <input id='username' value={username} onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor='firstName'>First Name: </label>
                        <input id='firstName' value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name: </label>
                        <input id='lastName' value={lastName} onChange={e => setLastName(e.target.value)}></input>
                    </div>
                    <button>Submit</button>
                </form>
                <Link to={`/users/${user.id}`}>Cancel</Link>
            </div>
        </>
    )
}

export default EditUserDetails
