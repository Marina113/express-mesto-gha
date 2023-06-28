const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
// const NotFoundError = require('../errors/notFoundError');

router.use(userRouter);
router.use(cardRouter);
// router.use((req, res) => {
//   res.status(NotFoundError).send({ message: 'Произошла ошибка' });
// });

module.exports = router;
