var mongoose = require('mongoose');


var jconSchema = new mongoose.Schema({
        "Processo": String,
        "Data do Acordão": String,
        "Relator": String,
        "Descritores": [String],
        "Nº Convencional": String,
        "Nº do Documento": String,
        "Recorrente": String,
        "Recorrido 1": String,
        "Recorrido 2": String,
        "Votação": String,
        "Área Temática": String,
        "Texto Integral": String,
        "url": String,
        "tribunal": String,
        "_id": String,
        "Data de Entrada": String,
        "Referência a Pareceres": String,
        "Meio Processual": String,
        "Objecto": String,
        "Decisão": String,
        "Área Temática 2": String,
        "Legislação Nacional": String,
        "Referência a Doutrina": String,
        "Jurisprudência Nacional": String,
        "Legislação Comunitária": String,
        "Indicações Eventuais": String,
        "Referências Internacionais": String,
        "Jurisprudência Internacional": String,
        "Nº do Volume": String,
        "Recusa Aplicação": String,
        "Ano da Publicação": String,
        "Privacidade": String,
        "Apêndice": String,
        "Data do Apêndice": String,
        "1ª Pág. de Publicação do Acordão": String,
        "Referência Publicação 1": String
});


module.exports = new mongoose.model('jcon',jconSchema);