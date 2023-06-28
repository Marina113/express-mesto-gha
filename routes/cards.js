const cardRouter = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getCards, delCardById, createCard, putLikes, delLikes } = require('../controllers/cards');
const { createCardValidation, delCardByIdValidation } = require('../middlewares/validation');

cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:_id', delCardByIdValidation, delCardById);
cardRouter.post('/cards', createCardValidation, createCard);
cardRouter.put('/cards/:_id/likes', delCardByIdValidation, putLikes);
cardRouter.delete('/cards/:_id/likes', delCardByIdValidation, delLikes);

module.exports = cardRouter;
