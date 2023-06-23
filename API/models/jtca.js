var mongoose = require('mongoose');


var jtcaSchema = new mongoose.Schema({
        "Processo": String,
        "Secção": String,
        "Data do Acordão": String,
        "Relator": String,
        "Descritores": [String],
        "Votação": String,
        "Decisão Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtca',jtcaSchema,'jtca');