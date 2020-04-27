const express = require('express');
const dotenv= require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


dotenv.config({path:'./config/config.env'});

connectDB();

const transactions = require('./routes/transactions');

app.use('/api/v1/transactions' , transactions);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}

const PORT =process.env.PORT || 5000;

app.listen(PORT,console.log(`server running on ${process.env.PORT}`.yellow.bold));
