const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');

const { Song, Playlist, User, Song_Playlist_Join } = require('../../db/models');

const router = express.Router();

const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage('Please provide a playlist name under 100 character.'),
    check('userId')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid user ID.'),
        handleValidationErrors,
    ];

router.get('/', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll({
        include: [ Song, User ]
    });
    return res.json(playlists);
}));

router.post('/', validatePlaylist, asyncHandler(async (req, res) => {
    const playlist = await Playlist.create(req.body);
    const newPlaylist = await Playlist.findByPk(playlist.id, { include: [ Song, User ] });
    return res.json(newPlaylist);
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const playlist = await Playlist.findByPk(+req.params.id);
    const joins = await Song_Playlist_Join.findAll({
        where: {
            playlistId: playlist.id
        }
    });
    joins.forEach(async join => await join.destroy())
    await playlist.destroy();
    res.json({message: "Successfully deleted"})
}))

router.post('/add-song', asyncHandler(async (req, res) => {
    await Song_Playlist_Join.create(req.body);
    const playlists = await Playlist.findAll({
        include: [ Song, User ]
    });
    return res.json(playlists);
}))

router.delete('/:playlistId/:songId', asyncHandler(async (req,res) => {
    const playlistId = +req.params.playlistId;
    const songId = +req.params.songId;
    const join = await Song_Playlist_Join.findOne({
        where: {
            playlistId,
            songId
        }
    });
    await join.destroy();

    const playlist = await Playlist.findByPk(playlistId, {
        include: [ Song, User ]
    });
    return res.json(playlist);
}))

module.exports = router;
