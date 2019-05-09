const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();
// คำสั่ง Run Server : npm run start:server
// 
mongoose
  .connect(
    'mongodb+srv://kit:wiX54m3ppnhFgC6C@cluster0-jdlxh.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

// connect to local db
// mongoose
//   .connect('mongodb://localhost:27017/node-angular', { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to database!');
//   })
//   .catch(() => {
//     console.log('Connection failed!');
//   });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  //console.log('First middleware');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,PUT,DELETE,OPTIONS'
  );
  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;
