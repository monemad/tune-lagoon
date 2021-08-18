import { useParams } from "react-router-dom";

const PlaylistPage = () => {
    const { playlistId } = useParams();
    return (
        <>
            Playlist Page {playlistId}
        </>
    )
}

export default PlaylistPage;
