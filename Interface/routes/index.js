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
})


router.get('/acordaos/:id', function(req, res, next) {
  axios.get("http://localhost:5555/acordaos/"+req.params.id)
      .then(acordao=>{
        res.render('pagAcordao', { acordao: acordao.data });
      })
      .catch(erro=>{
        res.render('error', { error: erro,message:"Erro a obter a página do acordao" });    
      })  
})


router.get('/edit/:id', function(req,res){
  axios.get("http://localhost:5555/acordaos/"+req.params.id)
  .then(acordao=>{
    res.render('editForm', { acordao: acordao.data });
  })
  .catch(erro=>{
    res.render('error', { error: erro,message:"Erro na abtenção do acordao" });    
  })  
})


router.get('/add', function(req, res) {
  res.render('addForm', {});
});

router.get('/faq', function(req, res){
  res.render('faq')
})


router.get('/login', function(req, res){           
  res.render('loginForm')
})


router.post('/edit/:id', function(req, res) {
  axios.put("http://localhost:5555/acordaos/"+req.params.id, req.body)
    .then(acordao => {
      res.render('editConfirm', {a: acordao})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do acordão"})
    })
})


router.post('/add', function(req, res) {
  axios.post("http://localhost:5555/acordaos", req.body)
    .then(acordao => {
      //res.render('editConfirm', {a: acordao})
      res.redirect('/acordaos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na criação do acordão"})
    })
})


/*
router.post('/login', function(req, res){
  axios.post('http://localhost:5557/users/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      res.redirect('/')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})


router.get('/logout', verificaToken, (req, res) => {
  res.cookie('token', "revogado.revogado.revogado")
  res.redirect('/')
})


router.post('/register', function(req, res) {
  axios.post("http://localhost:8002/users/register", req.body)
  .then(response => {
    res.redirect('/')
  })
  .catch(err => {
    res.render('error', {error: err, message: "Registo inválido"})
  })
})*/

module.exports = router;
