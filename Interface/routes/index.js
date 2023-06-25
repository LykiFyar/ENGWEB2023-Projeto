var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET home page. */
router.get('/acordaos', function(req, res, next) {
  query = ''
  if(req.query.processo){
    query = '?processo='+req.query.processo
  }
  else if(req.query.relator){
    query = '?relator='+req.query.relator
  }
  else if(req.query.tribunal){
    query = '?tribunal='+req.query.tribunal
  }
  else if(req.query.descritor){
    query = '?descritor='+req.query.descritor
  }
  else if(req.query.desde){
    query = '?desde='+req.query.desde
  }
  axios.get("http://localhost:5555/acordaos"+query)
    .then(dados=>{
      res.render('main', { processos: dados.data });
    })
    .catch(erro=>{
      res.render('error', { error: erro,message:"Erro a obter lista de acordaos" });
    })
});


router.get('/acordaos/:id', function(req, res, next) {
  axios.get("http://localhost:5555/acordaos/"+req.params.id)
      .then(dados=>{
        res.render('pagAcordao', { acordao: dados.data });
      })
      .catch(erro=>{
        res.render('error', { error: erro,message:"Erro a obter a página do acordao" });    
      })  
});

module.exports = router;
