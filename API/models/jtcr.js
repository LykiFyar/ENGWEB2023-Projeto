var mongoose = require('mongoose');


var jtrcSchema = new mongoose.Schema({
        "Processo": String,
        "Nº Convencional": String,
        "Relator": String,
        "Descritores": [String],
        "Data do Acordão": String,
        "Votação": String,
        "Tribunal Recurso": String,
        "Texto Integral": String,
        "Meio Processual": String,
        "Decisão": String,
        "Legislação Nacional": String,
        "Sumário": String,
        "Decisão Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtrc',jtrcSchema,'jtcr');