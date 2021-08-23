import { Link } from "react-router-dom";
import "./CommentContainer.css"

const CommentContainer = ({ comment, setNowPlaying, songUrl }) => {
        const timedComment = comment.timeElapsed !== -1;

    const formatTime = length => {
        let hours = `${parseInt(length / 3600)}`;

        let minutes = `${parseInt(length / 60)}`;
        while (minutes >= 60) minutes-=60;
        if (hours > 0 && minutes < 10) minutes = `0${minutes}`
        
        let seconds = `${parseInt(length % 60)}`;
        if (seconds < 10) seconds = `0${seconds}`
        
        if (hours > 0) return `${hours}:${minutes}:${seconds}`;
        return `${minutes}:${seconds}`
    }

    const skipToTime = () => {
        setNowPlaying(songUrl)
        const player = document.querySelector('audio');
        player.currentTime = comment.timeElapsed;
    }

    return (
        <>
            {comment && <div className='comment-div'>
                <div className='comment-details-div'>
                    { timedComment ?
                        <span className='comment-details comment-time-elapsed timed' onClick={skipToTime}>{formatTime(comment.timeElapsed)}</span>
                        :
                        <span className='comment-details comment-time-elapsed'>-:--</span>
                    }
                    <span className='comment-details comment-content'>{comment.content}</span>
                    <Link to={`/users/${comment.userId}`} className='comment-details comment-user'>{comment.User.username}</Link>
                </div>
            </div>}
        </>
    )
}

export default CommentContainer;
