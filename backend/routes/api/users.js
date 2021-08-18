const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Comment, Playlist } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Please provide a first name under 50 character.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Please provide a last name under 50 character.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// Sign up
router.post(
    '/', validateSignup, asyncHandler(async (req, res) => {
        const { firstName, lastName, username, email, password} = req.body;
        const user = await User.signup({ firstName, lastName, username, email, password });

        await setTokenCookie(res, user);

        return res.json({
        user,
        });
    }),
);

// Gets all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.findAll({
        include: [ Song, Playlist, 'LikedSongs' ]
    });
    return res.json(users);
}))

// Get a user by ID
router.get('/:id\\d+', asyncHandler(async (req, res) => {
    const id = req.params.id
}))

module.exports = router;
