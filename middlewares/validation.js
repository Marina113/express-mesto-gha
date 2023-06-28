const { celebrate, Joi } = require('celebrate');
const { regulExp } = require('../utils/regulExp');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regulExp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regulExp),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regulExp),
  }),
});

const delCardByIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  createUserValidation,
  getUserByIdValidation,
  loginValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  delCardByIdValidation,
};
