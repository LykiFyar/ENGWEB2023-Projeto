var mongoose = require('mongoose');


var jtcampcaSchema = new mongoose.Schema({
        "Contencioso": String,
        "Data": String,
        "Processo": String,
        "Nº Processo/TAF": String,
        "Sub-Secção": String,
        "Magistrado": String,
        "Descritores": [String],
        "url": String,
        "tribunal": String,
        "_id": String
});


module.exports = new mongoose.model('jtcampca',jtcampcaSchema);