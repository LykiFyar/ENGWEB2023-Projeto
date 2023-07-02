var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport')
var userModel = require('../models/user')
var auth = require('../auth/auth')

var User = require('../controllers/user')


router.get('/addfavorite/:id', auth.verificaAcesso, function(req, res){
  User.addFavorite(req.payload.username, req.params.id, "")
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(503).jsonp({error: e}))
})

router.get('/isLogged', auth.verificaAcesso, function(req, res){
  res.jsonp({isAdmin: (req.payload.level === "admin" ? true : false),
            isLogged: true 
  })
})
/*
router.get('/favorites_ids', auth.verificaAcesso, function(req, res){
  User.getUserFavoritesIDS(req.payload.username)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
})
*/
router.get('/favorites', auth.verificaAcesso, function(req, res){
  User.getUserFavorites(req.payload.username)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(504).jsonp({error: e}))
})

router.get('/getUsername', auth.verificaAcesso, function(req, res){
  res.status(200).jsonp(req.payload.username)
})


router.get('/', auth.verificaAcesso, function(req, res){
  User.list()
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(501).jsonp({error: e}))
})

router.get('/:username', auth.verificaAcesso, function(req, res){
  User.getUser(req.params.username)
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(502).jsonp({error: e}))
})



router.post('/', auth.verificaAcesso, function(req, res){
  User.addUser(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(505).jsonp({error: e}))
})

router.post('/updatefavorite/:id', auth.verificaAcesso, function(req, res){
  console.log(req.payload.username)
  console.log(req.params.id)
  console.log(req.body.note)
  
  User.updateFavoriteNote(req.payload.username, req.params.id, req.body.note)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(506).jsonp({error: e}))
})

router.post('/register', function(req, res) {
  var d = new Date().toISOString().substring(0,19)
  userModel.register(new userModel({ username: req.body.username, filiation: req.body.filiation, name: req.body.name, email: req.body.email,
                                      level: req.body.level, active: true, dateCreated: d, favorites: [] }), 
                req.body.password, 
                function(err, user) {
                  if (err) 
                    res.jsonp({error: err, message: "Register error: " + err})
                  else{
                    passport.authenticate("local")(req,res,function(){
                      jwt.sign({ username: req.user.username, level: req.user.level, 
                        sub: 'projeto de EngWeb2023 - Base de Dados de Acordãos'}, 
                        "EWProject_a97368_a97642_a97158",
                        {expiresIn: 3600},
                        function(e, token) {
                          if(e) res.status(507).jsonp({error: "Erro na geração do token: " + e}) 
                          else res.status(201).jsonp({token: token})
                        });
                    })
                  }     
                }
  )
})
  
router.post('/login', passport.authenticate('local'), function(req, res){
  var d = new Date().toISOString().substring(0,19);
  jwt.sign({ username: req.user.username, level: req.user.level, 
    sub: 'projeto de EngWeb2023 - Base de Dados de Acordãos'}, 
    "EWProject_a97368_a97642_a97158",
    {expiresIn: 3600},
    function(e, token) {
      if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
      else {
        User.updateLastAccess(req.user.username, d)
          .then(dados => {
            console.log(token)
            res.status(201).jsonp({token: token})
          })
          .catch((e) => {
            res.status(508).jsonp({error: "Erro a atualizar último acesso do utilizador: " + e}) 
          })
      }
  });
})

router.put('/:id', auth.verificaAcesso, function(req, res) {
  User.updateUser(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.put('/:id/desativar', auth.verificaAcesso, function(req, res) {
  User.updateUserStatus(req.params.id, false)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.put('/:id/ativar', auth.verificaAcesso, function(req, res) {
  User.updateUserStatus(req.params.id, true)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.put('/:id/password', auth.verificaAcesso, function(req, res) {
  User.updateUserPassword(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.delete('/deletefavorite/:id', auth.verificaAcesso, function(req, res){
  User.removeFavorite(req.payload.username, req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(509).jsonp({error: e}))
})

router.delete('/:id', auth.verificaAcesso, function(req, res) {
  User.deleteUser(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na remoção do utilizador"})
    })
})



module.exports = router;