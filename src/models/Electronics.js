const mongoose = require('mongoose');

let electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 10,
    },
    type: {
        type: String,
        required: true,
        minLength: 2,
    },
    damages: {
        type: String,
        required: true,
        minLength: 10,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200,
    },
    production: {
        type: String,
        required: true,
        min: 1900,
        max: 2023,
    },
    exploitation: {
        type: String,
        required: true,
        min: 0,  
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

electronicsSchema.method('getBuyingList', function () {
    return this.buyingList.map(x => x);
});

const Electronics = mongoose.model('Electronics', electronicsSchema);

module.exports = Electronics;
