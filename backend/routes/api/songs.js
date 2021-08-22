const express = require('express');
const asyncHandler = require('express-async-handler');
const {singleMulterUpload, singlePublicFileUpload} = require('../../awsS3')

const { Song, Comment, User, Genre } = require('../../db/models');

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
    const song = await Song.findByPk(+req.params.id);
    await song.destroy();
    res.json({ message: 'Successfully deleted!' })
}))

module.exports = router;
