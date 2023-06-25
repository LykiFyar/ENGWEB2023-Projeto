var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:5555/acordaos")
    .then(dados=>{
      res.render('main', { processos: dados.data });
    })
    .catch(erro=>{
      res.render('error', { error: erro,message:"Erro a obter lista de acordaos" });
    })
});

router.get('/:id', function(req, res, next) {
  axios.get("http://localhost:5555/acordaos/"+req.params.id)
      .then(dados=>{
        for (var d = 0; d < dados.data.length; d++){
          if (dados.data[d] != null) {
            acord = dados.data[d]
          }
        }
        res.render('pagAcordao', { acordao: acord });
      })
      .catch(erro=>{
        res.render('error', { error: erro,message:"Erro a obter a página do acordao" });    
      })  
});

module.exports = router;
