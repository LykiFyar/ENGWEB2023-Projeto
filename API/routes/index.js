var express = require('express');
var router = express.Router();
var Acordaos = require('../controler/acordaos');

var last_id = -1

/* GET home page. */
router.get('/acordaos', function(req, res) {
  var pageNumber = req.query.page
  var limit = 7

  console.log(last_id, pageNumber)

  if(req.query.processo){
    Acordaos.acordaosProcesso(req.query.processo,last_id)
    .then(acordao=>{
          last_id = acordao[limit-1]["_id"]
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo número de processo",error:erro })
        })
  }
  else if(req.query.relator){
    Acordaos.acordaosRelator(req.query.relator, limit, last_id)
      .then(acordao=>{
          last_id = acordao[limit-1]["_id"]
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo relator",error:erro })
        })
  }
  else if(req.query.tribunal){
    Acordaos.acordaosTribunal(req.query.tribunal, limit, last_id)
        .then(acordao=>{
          last_id = acordao[limit-1]["_id"]
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo tribunal",error:erro })
        })
  }
  else if(req.query.descritor){
    Acordaos.acordaosDescritor(req.query.descritor, limit, last_id)
        .then(acordao=>{
          last_id = acordao[limit-1]["_id"]
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo descritor",error:erro })
        })
  }
  else if(req.query.desde){
    Acordaos.acordaosDataDesde(req.query.desde,limit, last_id)
        .then(acordao=>{
          last_id = acordao[limit-1]["_id"]
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pela data",error:erro })
        })
  }
  else{
    last_id = limit * pageNumber
    Acordaos.list(limit, last_id)
      .then(acordaos=>{
        res.json(acordaos)
      })
      .catch(erro=>{
        res.status(601).json({ message: "Erro a obter lista de acordãos", error:erro })
      })
  }
});


router.get('/acordaos/:id', function(req, res) {
  Acordaos.getAcordao(req.params.id)
    .then(acordao=>{
      res.json(acordao)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro a eliminar acordão",error:erro })
    })
});


router.put('/acordaos/:id', function(req, res) {
  Acordaos.editAcordao(req.params.id, req.body)
    .then(acordao=>{
      res.json(acordao)
    })
    .catch(erro=>{
      res.status(604).json({ message: "Erro a atualizar acordão",error:erro })
    })
});


router.post('/acordaos', function(req, res) {
  Acordaos.addAcordao(req.body)
    .then(acordao=>{
      res.status(201).json(acordao)
    })
    .catch(erro=>{
      res.status(603).json({ message: "Erro a adicionar acordão",error:erro })
    })
});


router.delete('/acordaos/:id', function(req, res) {
  Acordaos.deleteAcordao(req.params.id)
    .then(acordao=>{
      res.json(acordao)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro a eliminar acordão",error:erro })
    })
});


module.exports = router;
