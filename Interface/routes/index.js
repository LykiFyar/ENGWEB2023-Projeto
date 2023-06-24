var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:5555/acordaos")
    .then(dados=>{
      console.log(dados.data)
      res.render('main', { processos: dados.data });
    })
    .catch(erro=>{
      res.render('error', { error: erro,message:"Erro a obter lista de acordaos" });
    })
});


module.exports = router;
