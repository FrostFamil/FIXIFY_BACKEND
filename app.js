const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const fixersLocationRoutes = require('./routes/fixersLocation');
const requestRoutes = require('./routes/requests');
const notificationRoutes = require('./routes/notifications');
const payment = require('./routes/payment');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/fixersLocation', fixersLocationRoutes);
app.use('/requests', requestRoutes);
app.use('/notification', notificationRoutes);
app.use('/payment', payment);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://famil:famil145@cluster0-laqzd.mongodb.net/FIXIFY?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(8080, "192.168.0.87");
  })
  .catch(err => console.log(err));

  module.exports = app;
