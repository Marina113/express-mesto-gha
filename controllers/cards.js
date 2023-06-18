/* eslint-disable no-unused-vars */
const Card = require('../models/card');

const {
  ERROR_CODE,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  OK_CODE,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' }));
};

const delCardById = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((cards) => {
      if (!cards) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный id' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_CODE).send({ message: 'Некорректные данные' }));
};

// eslint-disable-next-line no-unused-vars
const putLikes = (req, res) => {
  const ownerId = req.user._id;
  const cardId = req.params._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId } }, { new: true })
    .then((cards) => {
      if (!cards) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный id' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
    });
};

const delLikes = (req, res) => {
  const ownerId = req.user._id;
  const cardId = req.params._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, { new: true })
    .then((cards) => {
      if (!cards) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный id' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
    });
};

module.exports = {
  getCards, delCardById, createCard, putLikes, delLikes,
};
