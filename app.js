const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  { useNewUrlParser: true },
);

app.use((req, res, next) => {
  req.user = {
    // eslint-disable-next-line comma-dangle
    _id: '648c296afcffcaf04875e1d2'
  };

  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is working');
});
