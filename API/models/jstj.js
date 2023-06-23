var mongoose = require('mongoose');


var jstjSchema = new mongoose.Schema({
        "Processo": String,
        "Nº Convencional": String,
        "Relator": String,
        "Descritores": [String],
        "Data do Acordão": String,
        "Votação": String,
        "Texto Integral": String,
        "Privacidade": String,
        "Meio Processual": String,
        "Decisão": String,
        "Sumário": String,
        "Decisão Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jstj',jstjSchema,'jstj');