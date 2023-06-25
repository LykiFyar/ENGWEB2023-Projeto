var express = require('express');
var router = express.Router();
var Acordaos = require('../controler/acordaos');


/* GET home page. */
router.get('/acordaos', function(req, res, next) {
  if(req.query.processo){
    Acordaos.acordaosProcesso(req.query.processo)
    .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo número de processo",error:erro })
        })
  }
  else if(req.query.relator){
    Acordaos.acordaosRelator(req.query.relator)
      .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo relator",error:erro })
        })
  }
  else if(req.query.tribunal){
    Acordaos.acordaosTribunal(req.query.tribunal)
        .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo tribunal",error:erro })
        })
  }
  else if(req.query.descritor){
    Acordaos.acordaosDescritor(req.query.descritor)
        .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo descritor",error:erro })
        })
  }
  else if(req.query.desde){
    Acordaos.acordaosDataDesde(req.query.desde)
        .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pela data",error:erro })
        })
  }
  else{
    Acordaos.list()
      .then(acordaos=>{
        res.json(acordaos)
      })
      .catch(erro=>{
        res.status(601).json({ message: "Erro a obter lista de acordãos", error:erro })
      })
  }
});

router.get('/acordaos/:id', function(req, res, next) {
  Acordaos.getAcordao(req.params.id)
    .then(acordao=>{
      res.json(acordao)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro a eliminar acordão",error:erro })
    })
});

router.post('/acordaos', function(req, res, next) {
  Acordaos.addAcordao(req.body)
    .then(acordao=>{
      res.status(201).json(acordao)
    })
    .catch(erro=>{
      res.status(603).json({ message: "Erro a adicionar acordão",error:erro })
    })
});


router.delete('/acordaos/:id', function(req, res, next) {
  Acordaos.deleteAcordao(req.params.id)
    .then(acordao=>{
      res.json(acordao)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro a eliminar acordão",error:erro })
    })
});

module.exports = router;
