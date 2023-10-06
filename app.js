const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require ('./routes/authRoutes');


const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://dalsalahy:IvyTech2023@cluster0.wozqhwt.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);

// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/*app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }); // maxAge here represent one day time so the cookie will be deleted after one day.
                                                                                  // httpOnly make is accessable only through http protocol and can't be accessed from the brower by js
                                                                                  //if we used secure: true that means it could be sent only if the connection is secured 
  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});*/