const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    title: String,
    entry: String,
    shipIsBroken: {type:Boolean, default:true},
    time:{ type : Date, default: Date.now }
    
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log; 