var express = require('express');
var router = express.Router();
var Acordaos = require('../controler/acordaos');

var aaa = 1

/* GET home page. */
router.get('/acordaos', function(req, res) {
  var nQueries = Object.keys(req.query).length;
  var pageNumber = req.query.page
  var nextPage = "undefined" 
  if (aaa != 1){
    nextPage = req.query.nextPage 
  } 
  var limit = 7


  if(req.query.desde){
    Acordaos.acordaosDataDesde(req.query.desde,limit,next_id)
        .then(acordao=>{
          next_id = acordao[limit-2]["_id"]
          res.json(acordao)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter acordãos pela data",error:erro })
        })
  }
  else if (nQueries > 2) {
    delete req.query.page
    delete req.query.nextPage

    if(nextPage == "true"){
      Acordaos.acordaosFilter(req.query,limit,next_id,nextPage)
      .then(acordaos=>{
        console.log(acordaos.length)
        next_id = acordaos[acordaos.length - 1]["_id"]
        prev_id = acordaos[0]["_id"]
        res.json(acordaos)
      })
      .catch(erro=>{
        res.status(602).json({ message: "Erro a obter acordãos com os filtros aplicados",error:erro })
      })
    } else if(nextPage == "false") {
      Acordaos.acordaosFilter(req.query,limit,prev_id,nextPage)
      .then(acordaos=>{
        acordaos = acordaos.sort((a,b) => {
          if (a._id < b._id){
            return -1
          }
        })
        next_id = acordaos[acordaos.length - 1]["_id"]
        prev_id = acordaos[0]["_id"]
        res.json(acordaos)
      })
      .catch(erro=>{
        res.status(602).json({ message: "Erro a obter acordãos com os filtros aplicados",error:erro })
      })
    } else {
      Acordaos.acordaosFilter(req.query,limit,0,"true")
      .then(acordaos=>{
        next_id = acordaos[acordaos.length - 1]["_id"]
        prev_id = acordaos[0]["_id"]
        aaa = 2
        res.json(acordaos)
      })
      .catch(erro=>{
        res.status(602).json({ message: "Erro a obter acordãos com os filtros aplicados",error:erro })
      })
    }
  }
  else  { 
    next_id = limit * pageNumber
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


module.exports = router;
