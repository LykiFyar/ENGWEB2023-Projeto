var mongoose = require('mongoose');


var jtreSchema = new mongoose.Schema({
        "Processo": String,
        "Relator": String,
        "Descritores": [String],
        "Data do Acordão": String,
        "Votação": String,
        "Texto Integral": String,
        "Sumário": String,
        "Decisão Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtre',jtreSchema,'jtre');