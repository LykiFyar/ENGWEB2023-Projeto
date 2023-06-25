var express = require('express');
var router = express.Router();
var Jcon = require('../controler/jcon');
var Jdgpj = require('../controler/jdgpj');
var Atco = require('../controler/atco');
var Acordaos = require('../controler/acordaos');


/* GET home page. */
router.get('/acordaos', function(req, res, next) {
  if(req.query.processo){
    //Promise.all([Atco.acordaosProcesso(req.query.processo), Jcon.acordaosProcesso(req.query.processo), Jdgpj.acordaosProcesso(req.query.processo)])
    Acordaos.acordaosProcesso(req.query.processo)
    .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo número de processo",error:erro })
        })
  }
  else if(req.query.relator){
    //Promise.all([Atco.acordaosRelator(req.query.relator), Jcon.acordaosRelator(req.query.relator), Jdgpj.acordaosRelator(req.query.relator)])
    Acordaos.acordaosRelator(req.query.relator)
      .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo relator",error:erro })
        })
  }
  else if(req.query.tribunal){
    //Promise.all([Jdgpj.acordaosTribunal(req.query.tribunal),Atco.acordaosTribunal(req.query.tribunal),Jcon.acordaosTribunal(req.query.tribunal)])
    Acordaos.acordaosTribunal(req.query.tribunal)
        .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo tribunal",error:erro })
        })
  }
  else if(req.query.descritor){
    //Promise.all([Jdgpj.acordaosDescritor(req.query.descritor),Atco.acordaosDescritor(req.query.descritor),Jcon.acordaosDescritor(req.query.descritor)])
    Acordaos.acordaosDescritor(req.query.descritor)
        .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pelo descritor",error:erro })
        })
  }
  else if(req.query.desde){
    //Promise.all([Jdgpj.acordaosDataDesde(req.query.desde),Atco.acordaosDataDesde(req.query.desde),Jcon.acordaosDataDesde(req.query.desde)])
    Acordaos.acordaosDataDesde(req.query.desde)
        .then(acordao=>{
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pela data",error:erro })
        })
  }
  else{
    //Promise.all([Jdgpj.list(), Atco.list(), Jcon.list()])
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
  //Promise.all([Atco.getAcordao(req.params.id), Jcon.getAcordao(req.params.id), Jdgpj.getAcordao(req.params.id)])
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
