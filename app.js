const express = require('express');
const bodyParser = require('body-parser');
const exhandlebars = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const contact = require('./routes/contact');


//View engine setup
app.engine('handlebars', exhandlebars());
app.set('view engine', 'handlebars');

//static folders
app.use('/public',express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', contact);


app.listen(3000 , () => {
  console.log('server started on port :: 3000');
})

module.exports = app;
