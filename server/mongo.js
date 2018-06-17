const mongoose = require('mongoose');
// const env = require('./secrets');

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${process.env.USER || env.user}:${process.env.PASSWORD || env.password}@${process.env.LINK || env.link}`;

const connect = () => {
    return mongoose.connect(mongoUri);
}

module.exports = {
    connect,
    mongoose
};