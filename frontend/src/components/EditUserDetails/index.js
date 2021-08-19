import { useState } from "react";

const { Link } = require("react-router-dom")



const EditUserDetails = ({ user }) => {

    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [errors, setErrors] = useState([]);

    const submitHandler = e => {
        console.log('Form submitted!')
        const payload = {
            username,
            firstName,
            lastName
        }
        console.log(payload);
        e.preventDefault();
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setErrors([]);
    //     return dispatch(sessionActions.login({ credential, password }))
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             if (data && data.errors) setErrors(data.errors);
    //         });
    // }
    
    return (
        <>
            <div className='edit-user-details'>
                <form onSubmit={submitHandler}>
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
