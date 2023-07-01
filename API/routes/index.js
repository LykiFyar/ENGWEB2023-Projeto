var express = require('express');
var router = express.Router();
var Acordaos = require('../controler/acordaos');
//const acordaos = require('../models/acordaos');
var Sugestoes = require('../controler/sugestoes');
const sugestoes = require('../models/sugestoes');



var next_id = 0


router.get('/acordaos/total', function(req, res) {
  Acordaos.getTotal()
    .then(total=>{
      res.json(total)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro ao obter o total de registos",error:erro })
    })
});


/* GET home page. */
router.get('/acordaos', function(req, res) {
  var nQueries = Object.keys(req.query).length;
  var pageDirection = JSON.parse(req.query.pageDirection) 
  var pageNumber = req.query.page
  var limit = 8

  if(req.query.desde){
    Acordaos.acordaosDataDesde(req.query.desde,limit,next_id)
        .then(acordao=>{
          next_id = acordao[acordaos.length - 1]["_id"]
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pela data",error:erro })
        })
  }
  else if (nQueries > 2) {
    if(pageDirection){
      Acordaos.acordaosFilter(req.query,limit,next_id,pageDirection)
      .then(acordaos=>{
        if(acordaos.length > 0){
          if (acordaos.length == 1) {
            next_id = acordaos[0]["_id"]
          }else{
            next_id = acordaos[acordaos.length - 2]["_id"]
          }          
          prev_id = acordaos[0]["_id"]
          res.json(acordaos)
        }
        else {
          res.json([{ message: "Não foram encontrados registos"}])
        }
      })
      .catch(erro=>{
        res.status(602).json({ message: "Erro a obter acordãos com os filtros aplicados",error:erro })
      })
    } 
    else {
      Acordaos.acordaosFilter(req.query,limit,prev_id,pageDirection)
      .then(acordaos=>{
        if(acordaos.length > 0){
          acordaos = acordaos.sort((a,b) => {
            if (a._id < b._id){
              return -1
            }
          })
          if (acordaos.length == 1) {
            next_id = acordaos[0]["_id"]
          }else{
            next_id = acordaos[acordaos.length - 2]["_id"]
          }
          prev_id = acordaos[0]["_id"]
          res.json(acordaos)
        }
        else{
          res.json([{ message: "Não foram encontrados registos"}])
        }
      })
      .catch(erro=>{
        res.status(602).json({ message: "Erro a obter acordãos com os filtros aplicados",error:erro })
      })
    } 
  }
  else { 
    next_id = ((limit-1) * pageNumber)      
    Acordaos.list(limit, next_id)
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


router.get('/sugestoes/total', function(req, res) {
  Sugestoes.getTotal()
    .then(total=>{
      res.json(total)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro ao obter o total de sugestões",error:erro })
    })
});


router.get('/sugestoes', function(req, res) {
  var pageNumber = req.query.page
  var limit = 8

  next_id = ((limit-1) * pageNumber)      
  Sugestoes.list(limit, next_id)
    .then(sugestoes=>{
      if (sugestoes.length > 0) res.json(sugestoes)
      else res.json([{ message: "Não foram encontradas sugestões"}])
    })
    .catch(erro=>{
      res.status(601).json({ message: "Erro a obter lista de sugestões", error:erro })
    })
});


router.get('/sugestoes/:id', function(req, res) {
  Sugestoes.getSugestao(req.params.id)
    .then(sugestao=>{
      res.json(sugestao)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro na obtenção da sugestão",error:erro })
    })
});


router.post('/sugestoes', function(req, res) {
  Sugestoes.addSugestao(req.body)
    .then(sugestao=>{
      res.status(201).json(sugestao)
    })
    .catch(erro=>{
      res.status(603).json({ message: "Erro a adicionar sugestão",error:erro })
    })
});


router.delete('/sugestoes/:id', function(req, res) {
  Sugestoes.deleteSugestao(req.params.id)
    .then(acordao=>{
      res.json(acordao)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro a eliminar sugestão",error:erro })
    })
});


module.exports = router;
