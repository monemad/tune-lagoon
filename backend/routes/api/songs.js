const express = require('express');
const asyncHandler = require('express-async-handler');

const { Song, Comment, User } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    console.log('in the get /api/songs')
    const songs = await Song.findAll({
        include: [ User, Comment, 'SongVotes' ]
    })
    return res.json(songs);
}))

module.exports = router;
