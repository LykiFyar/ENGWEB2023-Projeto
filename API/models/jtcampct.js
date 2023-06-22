var mongoose = require('mongoose');


var jtcampctSchema = new mongoose.Schema({
        "Contencioso": String,
        "Peça Processual": String,
        "Data": String,
        "Processo": String,
        "Nº Processo/TAF": String,
        "Sub-Secção": String,
        "Magistrado": String,
        "Descritores": [String],
        "Tema": String,
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtcampct',jtcampctSchema);