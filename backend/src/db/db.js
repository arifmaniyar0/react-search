const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.once('open', () => {
console.log('db connection successfull')
})
// db.collection('comapnies').drop()
// console.log(db.collections)
module.exports = db;

