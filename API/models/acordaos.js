var mongoose = require('mongoose');


var acordaosSchema = new mongoose.Schema({
        "_id": Number,
        "Processo": String,
        "Descritores": [String],
        "tribunal": String,
        "Data do Acordão": String,
        "url": String,
        "Relator": String,
        "Votação": String,
        "Decisão": String,
        "Texto Integral": String,
        "Nº Convencional": String,
        "Nº do Documento": String,
        "Área Temática": String,
        "Legislação Nacional": String,
        "Sumário": String,
        "Meio Processual": String,
        "Privacidade": String,
        "Decisão Texto Integral": String,
        "Jurisprudência Nacional": String,
        "Indicações Eventuais": String,
        "Data": String,
        "Legislação Estrangeira": String,
        "Área Temática 2": String,
        "Data de Entrada": String,
        "Recorrente": String,
        "Recorrido 1": String,
        "Nº Processo/TAF": String,
        "Sub-Secção": String,
        "Magistrado": String,
        "Observações": String,
        "Disponível na JTCA": String,
        "Secção": String,
        "Tribunal": String,
        "Tribunal Recurso": String,
        "Contencioso": String,
        "Apêndice": String,
        "Data do Apêndice": String,
        "Acordão": String,
        "Espécie": String,
        "Requerente": String,
        "Requerido": String,
        "Normas Apreciadas": String,
        "Normas Julgadas Inconst": String,
        "Constituição": String,
        "Nº do Diário da República": String,
        "Série do Diário da República": String,
        "Data do Diário da República": String,
        "Página do Diário da República": String,
        "Jurisprudência Constitucional": String,
        "Normas Suscitadas": String,
        "Voto Vencido": String,
        "Recorrido 2": String,
        "Referência a Doutrina": String,
        "Tribunal 1ª instância": String,
        "Juízo ou Secção": String,
        "Tipo de Ação": String,
        "Tipo de Contrato": String,
        "Autor": String,
        "Réu": String,
        "Data da Decisão": String,
        "Texto das Cláusulas Abusivas": String,
        "Recursos": String,
        "Referência de Publicação": String,
        "Processo no Tribunal Recurso": String,
        "Processo no Tribunal Recorrido": String,
        "Parecer Ministério Publico": String,
        "Peça Processual": String,
        "Tema": String,
        "Texto Parcial": String,
        "Reclamações": String,
        "Tribunal Recorrido": String,
        "Doutrina": String
});


module.exports = new mongoose.model('acordao', acordaosSchema, 'acordaos');