var express = require('express');
var router = express.Router();
var Atco = require('../controler/atco');

/* GET home page. */
router.get('/acordaos', function(req, res, next) {
  if(req.query.processo){
    Atco.acordaosProcesso(req.query.processo)
        .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo número de processo",error:erro })
        })
  }
  else if(req.query.relator){
    Atco.acordaosRelator(req.query.relator)
        .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo relator",error:erro })
        })
  }
  else{
    Atco.list()
    .then(acordaos=>{
      res.json(acordaos)
    })
    .catch(erro=>{
      res.status(601).json({ message: "Erro a obter lista de acordãos.", error:erro })
    })
  }
});


/*
router.get('/consultas/nomes', function(req, res, next) {
  Atco.nomes()
    .then(lista_nomes=>{
      res.jsonp(lista_nomes)
    })
    .catch(erro=>{
      res.status(602).json({ message: "Erro a obter lista de nomes",error:erro })
    })
});*/


router.post('/acordaos', function(req, res, next) {
  Atco.addAcordao(req.body)
    .then(acordao=>{
      res.status(201).json(acordao)
    })
    .catch(erro=>{
      res.status(603).json({ message: "Erro a adicionar acordão.",error:erro })
    })
});


router.delete('/acordaos/:id', function(req, res, next) {
  Atco.deleteAcordao(req.params.id)
    .then(acordao=>{
      res.json(acordao)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro a eliminar acordão.",error:erro })
    })
});

module.exports = router;
