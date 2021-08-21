const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');

const { Song, Playlist, User } = require('../../db/models');

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
    const playlist = await Playlist.findByPk(+req.params.id, {
        include: [ Song, User ]
    });
    playlist.destroy();
    res.json({message: "Successfully deleted!"});
}))

module.exports = router;
