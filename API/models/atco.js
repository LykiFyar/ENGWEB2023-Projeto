var mongoose = require('mongoose');


var atcoSchema = new mongoose.Schema({
        "Nº Convencional": String,
        "Acordão": String,
        "Processo": String,
        "Relator": String,
        "Descritores": [String],
        "Nº Documento": String,
        "Data do Acordão": String,
        "Espécie": String,
        "Requerente": String,
        "Requerido": String,
        "Votação": String,
        "Privacidade": String,
        "Normas Apreciadas": String,
        "Normas Julgadas Inconst.": String,
        "Área Temática": String,
        "Área Temática 2": String,
        "Decisão": String,
        "Sumário": String,
        "Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('atco',atcoSchema);