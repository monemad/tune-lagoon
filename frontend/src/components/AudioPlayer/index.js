import AudioPlayer from 'react-h5-audio-player'

const AudioPlayer = ({ nowPlaying }) => {

    return (
        <AudioPlayer layout='horizontal' src={nowPlaying} volume={0.3} />
    )
}
