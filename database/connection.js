const mongoose = require('mongoose');
require("dotenv").config() 

const {DATABASE_URL}=process.env


mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .on('open', () => console.log('Database Connected'))
    .on('error', (error) => console.log(error))
    .on('close', () => console.log('Database Closed'));

module.exports = mongoose;
