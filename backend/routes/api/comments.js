const express = require('express');
const asyncHandler = require('express-async-handler');

const { Comment, Song, User, Genre } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const newComment = await Comment.create(req.body);
    const song = await Song.findByPk(newComment.songId, {
        include: [ User, {model: Comment, include: User}, Genre, 'SongVotes' ]
    });
    res.json(song);
}))

router.put('/:id', asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(+req.params.id);
    await comment.update(req.body);
    const song = await Song.findByPk(comment.songId, {
        include: [ User, {model: Comment, include: User}, Genre, 'SongVotes' ]
    });
    res.json(song);
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(+req.params.id);
    const songId = comment.songId;
    await comment.destroy();
    const song = await Song.findByPk(songId, {
        include: [ User, {model: Comment, include: User}, Genre, 'SongVotes' ]
    });
    res.json(song);
}))

module.exports = router;
