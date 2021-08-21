import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadSong, createSong } from '../../store/songs';

const UploadSongForm = ({ setNowPlaying }) => {
    const [title, setTitle] = useState('');
    const [length, setLength] = useState(0);
    // const [songUrl, setSongUrl] = useState('');
    const [file,  setFile] = useState(null);

    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const songUrl = await dispatch(uploadSong(file));
        console.log('SONG URL', songUrl);
        const audio = document.createElement('audio');
        audio.src = songUrl;
        audio.addEventListener('loadeddata', () => {
            console.log(audio.duration);
            setLength(Math.floor(audio.duration))
            const payload = {
                title,
                length,
                songUrl,
                userId: sessionUser?.id,
                artworkUrl: 'images/default-artwork.png'
            }
            dispatch(createSong(payload))

        })
        


        setNowPlaying(songUrl);
    }
    
    return (
        <>
            <h1>Upload file</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Song Title:</label>
                    <input id='title' value={title} onChange={e=>setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='song'>Choose your song:</label>
                    <input id='song' type='file' onChange={e => setFile(e.target.files[0])} />
                </div>
                <button>Submit</button>
            </form>
            <audio></audio>
        </>
    )
}

export default UploadSongForm;
