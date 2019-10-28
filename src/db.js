const config = require('./config/environment/index.js');

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.db.address}/${config.db.name}`, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to DB!')
})