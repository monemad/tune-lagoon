const express = require('express');
const asyncHandler = require('express-async-handler');
const {singleMulterUpload, singlePublicFileUpload} = require('../../awsS3')

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
    await comment.destroy();
    res.json({ message: 'Successfully deleted!' });
}))

module.exports = router;
