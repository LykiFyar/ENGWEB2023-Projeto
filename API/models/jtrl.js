var mongoose = require('mongoose');


var jtrlSchema = new mongoose.Schema({
        "Processo": String,
        "Relator": String,
        "Descritores": [String],
        "Nº do Documento": String,
        "Data do Acordão": String,
        "Votação": String,
        "Texto Integral": String,
        "Texto Parcial": String,
        "Meio Processual": String,
        "Decisão": String,
        "Sumário": String,
        "Decisão Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtrl',jtrlSchema,'jtrl');