var mongoose = require('mongoose');


var jtrpSchema = new mongoose.Schema({
        "Processo": String,
        "Nº Convencional": String,
        "Relator": String,
        "Descritores": [String],
        "Nº do Documento": String,
        "Data do Acordão": String,
        "Votação": String,
        "Texto Integral": String,
        "Privacidade": String,
        "Meio Processual": String,
        "Decisão": String,
        "Indicações Eventuais": String,
        "Área Temática": String,
        "Sumário": String,
        "Reclamações": String,
        "Decisão Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtrp',jtrpSchema,'jtrp');