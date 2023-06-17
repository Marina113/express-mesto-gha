const cardRouter = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getCards, delCardById, createCard, putLikes, delLikes } = require('../controllers/cards');

cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:_id', delCardById);
cardRouter.post('/cards', createCard);
cardRouter.put('/cards/:_id/likes', putLikes);
cardRouter.delete('/cards/:_id/likes', delLikes);

module.exports = cardRouter;