/* eslint-disable no-unused-vars */
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const delCardById = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

// eslint-disable-next-line no-unused-vars
const putLikes = (req, res) => {
  const ownerId = req.user._id;
  const cardId = req.params._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId } }, { new: true })
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const delLikes = (req, res) => {
  const ownerId = req.user._id;
  const cardId = req.params._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, { new: true })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

module.exports = {
  getCards, delCardById, createCard, putLikes, delLikes,
};
