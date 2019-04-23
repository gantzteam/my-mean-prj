const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
// 9eDxEXP0KjZFvs3q
// mongoose
//   .connect(
//     'mongodb+srv://kit:dqtfAXOL0RQ6f1Eq@cluster0-jdlxh.mongodb.net/test?retryWrites=true',
//     { useNewUrlParser: true }
//   )
//   .then(() => {
//     console.log('Connected to database!');
//   })
//   .catch(() => {
//     console.log('Connection failed!');
//   });

mongoose
  .connect('mongodb://localhost:27017/node-angular')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

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
    'GET,POST,PATCH,DELETE,OPTIONS'
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  // const posts = [
  //   {
  //     id: 'asdasdsadas',
  //     title: 'First server-side post',
  //     content: 'This is coming from the server!'
  //   },
  //   {
  //     id: 'rryrtyrtyry',
  //     title: 'Second server-side post',
  //     content: 'This is coming from the server!'
  //   }
  // ];
  // เปลี่ยนไปดึงจาก db
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    })
    .catch(() => {});
  //   res.send('Hello from express!'); // return response
});

app.delete('/api/posts/:id', (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
  });
  res.status(200).json({
    message: 'Posts deleted!'
  });
});

module.exports = app;