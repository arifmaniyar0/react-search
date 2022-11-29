const mongoose = require('mongoose')

var adsSchema = new mongoose.Schema({
    _id: Number,
    companyId: {
        type: Number,
        ref: 'comapny'
    },
    primaryText: {
        type: String,
        trim: true
    },
    headline: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    CTA: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    }
}, { _id: false });

var Ads = mongoose.model('ads', adsSchema);

module.exports = Ads;
