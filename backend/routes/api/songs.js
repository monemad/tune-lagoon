const express = require('express');
const asyncHandler = require('express-async-handler');
const {singleMulterUpload, singlePublicFileUpload} = require('../../awsS3')

const { Song, Comment, User, Genre, Song_Playlist_Join, Song_Genre_Join, Song_Vote } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    console.log('in the get /api/songs')
    const songs = await Song.findAll({
        include: [ User, {model: Comment, include: User}, Genre, 'SongVotes' ]
    })
    return res.json(songs);
}));

router.post('/upload', singleMulterUpload('song'), asyncHandler(async (req, res) => {
    const songUrl = await singlePublicFileUpload(req.file);
    res.json(songUrl);
}));

router.post('/', asyncHandler(async (req, res) => {
    const newSong = await Song.create(req.body);
    const detailedSong = await Song.findByPk(newSong.id, {
        include: [ User, {model: Comment, include: User}, Genre, 'SongVotes' ]
    });
    res.json(detailedSong);
}))

router.put('/:id', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(+req.params.id, {
        include: [ User, {model: Comment, include: User}, Genre, 'SongVotes' ]
    });
    await song.update(req.body);
    res.json(song);
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const songId = +req.params.id;
    // const playlistJoins = await Song_Playlist_Join.findAll({
    //     where: {
    //         songId
    //     }
    // })
    // const genreJoins = await Song_Genre_Join.findAll({
    //     where: {
    //         songId
    //     }
    // })
    // const songComments = await Comment.findAll({
    //     where: {
    //         songId
    //     }
    // })
    // const votes = await Song_Vote.findAll({
    //     where: {
    //         songId
    //     }
    // })
    // playlistJoins.forEach(async join => await join.destroy())
    // genreJoins.forEach(async join => await join.destroy())
    // songComments.forEach(async comment => await comment.destroy())
    // votes.forEach(async vote => await vote.destroy())

    const song = await Song.findByPk(+req.params.id);
    await song.destroy();
    res.json({ message: 'Successfully deleted!' })
}))

module.exports = router;
