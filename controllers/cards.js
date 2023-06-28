/* eslint-disable no-unused-vars */
const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const CastError = require('../errors/castError');
const ValidationError = require('../errors/validationError');
const ForbiddenError = require('../errors/forbiddenError');

const {
  OK_CODE,
} = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const delCardById = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params._id)
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (cards.owner.toString() !== userId) {
        throw new ForbiddenError('Нельзя удалять чужую карточку!');
      }
      Card.findByIdAndRemove(req.params._id).then(() => res.send({ data: cards }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Некорректный id'));
      }
      return next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// eslint-disable-next-line no-unused-vars
const putLikes = (req, res, next) => {
  const ownerId = req.user._id;
  const cardId = req.params._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId } }, { new: true })
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

const delLikes = (req, res, next) => {
  const ownerId = req.user._id;
  const cardId = req.params._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, { new: true })
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, delCardById, createCard, putLikes, delLikes,
};
