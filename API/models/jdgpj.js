var mongoose = require('mongoose');


var jdgpjSchema = new mongoose.Schema({
        "Processo": String,
        "Tribunal 1ª instância": String,
        "Juízo ou Secção": String,
        "Tipo de Ação": String,
        "Tipo de Contrato": String,
        "Autor": String,
        "Réu": String,
        "Data da Decisão": String,
        "Descritores": [String],
        "Texto das Cláusulas Abusivas": String,
        "Recursos": String,
        "Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String,
        "Relator": String,
        "Data do Acordão": String,
        "Decisão": String
    });


module.exports = new mongoose.model('jdgpj',jdgpjSchema);