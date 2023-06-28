const userRouter = require('express').Router();

const {
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');
// eslint-disable-next-line object-curly-newline
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

userRouter.get('/users/me', getUserInfo);
userRouter.get('/users', getUsers);
userRouter.get('/users/:_id', getUserByIdValidation, getUserById);
// userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateProfileValidation, updateProfile);
userRouter.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = userRouter;
