const mongoose = require('mongoose')

var companySchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        trim: true,
        require: true,
        lowercase: true
    },
    url: {
        type: String,
        trim: true,
        require: true,
        lowercase: true
    }
}, { _id: false });

var Company = mongoose.model('comapny', companySchema);

module.exports = Company;
