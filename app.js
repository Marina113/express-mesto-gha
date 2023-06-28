const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, createUserValidation } = require('./middlewares/validation');
// const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  { useNewUrlParser: true },
);

app.use(express.json());

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

// авторизация
app.use(auth);

app.use(routes);

app.use(errors());
app.use('*', (req, res) => res.status(404).send({ message: 'Страница не существует' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is working');
});
