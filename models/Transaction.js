const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    text: {
        type:String,
        trim : true,
        required : [true, 'please add some text']
    },
    amount : {
        type  : Number,
        required : [true,'pleases add amount']
    },
    createdAt : {
        type:Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Transaction',TransactionSchema);