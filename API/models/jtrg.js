var mongoose = require('mongoose');


var jtrgSchema = new mongoose.Schema({
        "Processo": String,
        "Relator": String,
        "Descritores": [String],
        "Nº do Documento": String,
        "Data do Acordão": String,
        "Votação": String,
        "Texto Integral": String,
        "Meio Processual": String,
        "Decisão": String,
        "Indicações Eventuais": String,
        "Sumário": String,
        "Decisão Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtrg',jtrgSchema,'jtrg');