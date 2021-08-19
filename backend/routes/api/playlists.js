const express = require('express');
const asyncHandler = require('express-async-handler');

const { Song, Playlist, User } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll({
        include: [ Song, User ]
    })
    return res.json(playlists);
}))

module.exports = router;
