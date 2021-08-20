const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv')

dotenv.config({path:'./config/config.env'});
const connectDB= require('./config/db');
connectDB();
const school =require('./router/router');
const app=express();
app.use(express.json());
app.use(cors())
app.use('/api/v1/school',school);

const PORT= process.env.PORT | 4000;

app.listen(PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port${PORT}`));


