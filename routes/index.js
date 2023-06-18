const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { ERROR_CODE } = require('../utils/constants');

router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
  res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
});

module.exports = router;
