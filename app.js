const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/APIAUTHENTICATION');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));




// Catch 404 Error forward them to error handler
app.use((req, res, next) =>{
    const err = new error('not found');
    err.status = 404;
    next(err);
});

//error handler function
app.use((req, res, next) =>{

    const error = app.get('env') == 'development' ? err : {};
    const status = err.status || 500;
 //respond to client
 res.status(status).json({
     error: {
         message :error.message
     }
 });


 //respond to ourselves
 console.error(err);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);