var mongoose = require('mongoose');


var jstaSchema = new mongoose.Schema({
        "Processo": String,
        "Data do Acordão": String,
        "Tribunal": String,
        "Relator": String,
        "Descritores": [String],
        "Nº Convencional": String,
        "Nº Documento": String,
        "Data de Entrada": String,
        "Recorrente": String,
        "Recorrido 1": String,
        "Votação": String,
        "Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jsta',jstaSchema);