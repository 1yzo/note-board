const mongoose = require('mongoose');
let secret;

if (!process.env.NODE_ENV) {
    secret = require('./secrets');
}

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${process.env.USER || secret.user}:${process.env.PASSWORD || secret.password}@${process.env.LINK || secret.link}`;

const connect = () => {
    return mongoose.connect(mongoUri);
}

module.exports = {
    connect,
    mongoose
};