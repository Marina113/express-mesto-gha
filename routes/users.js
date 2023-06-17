const userRouter = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getUsers, getUserById, createUser, updateProfile, updateAvatar } = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:_id', getUserById);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
