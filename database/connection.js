const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fyp-internal-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .on('open', () => console.log('Database Connected'))
    .on('error', (error) => console.log(error))
    .on('close', () => console.log('Database Closed'));

module.exports = mongoose;
