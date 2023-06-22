var mongoose = require('mongoose');


var jtcnSchema = new mongoose.Schema({
        "Processo": String,
        "Secção": String,
        "Data do Acordão": String,
        "Tribunal": String,
        "Relator": String,
        "Descritores": [String],
        "Sumário": String,
        "Recorrente": String,
        "Recorrido 1": String,
        "Votação": String,
        "Meio Processual": String,
        "Parecer Ministério Publico": String,
        "Decisão Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtcn',jtcnSchema);