var mongoose = require('mongoose');


var sugestoesSchema = new mongoose.Schema({
        "_id": Number,
        "Username": String,
        "Data de Submissão": Date,
        "Tipo": String,
        "Assunto": String,
        "Sugestão": String
});


module.exports = new mongoose.model('sugestoes', sugestoesSchema, 'sugestoes');