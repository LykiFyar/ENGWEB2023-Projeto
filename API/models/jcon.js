var mongoose = require('mongoose');


var jconSchema = new mongoose.Schema({
        "Processo": String,
        "Data do Acordão": String,
        "Relator": String,
        "Descritores": [String],
        "Nº Convencional": String,
        "Nº Documento": String,
        "Recorrente": String,
        "Recorrido 1": String,
        "Recorrido 2": String,
        "Votação": String,
        "Área Temática": String,
        "Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jcon',jconSchema);