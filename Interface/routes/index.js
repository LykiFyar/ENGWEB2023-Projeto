var express = require('express');
var router = express.Router();
var env = require('../config/env')
var axios = require("axios")


function verificaToken(req, res, next) {
  if(req.cookies && req.cookies.token) next()
  else {
    res.redirect("/login")
  }
}

function isAdmin() {
  axios.get()
}

var campos = ['Nº do Documento',' Nº Convencional','Data da Decisão','Data','Data de Entrada','Votação','Área Temática','Área Temática 2','Privacidade','Legislação Nacional',
              'Meio Processual','Texto Integral','Decisão','Decisão Texto Integral','Sumário',
              'Jurisprudência Nacional','Indicações Eventuais','Legislação Estrangeira',
              'Recorrente','Recorrido 1','Nº Processo/TAF','Sub-Secção','Magistrado','Observações','Disponível na JTCA','Secção',
              'Tribunal','Tribunal Recurso','Contencioso','Apêndice','Data do Apêndice','Acordão','Espécie','Requerente','Requerido',
              'Normas Apreciadas','Normas Julgadas Inconst','Constituição','Nº do Diário da República','Série do Diário da República',
              'Data do Diário da República','Página do Diário da República','Jurisprudência Constitucional','Normas Suscitadas','Voto Vencido',
              'Recorrido 2','Tribunal 1ª instância','Juízo ou Secção','Tipo de Ação','Tipo de Contrato','Autor','Réu',
              'Texto das Cláusulas Abusivas','Recursos','Referência de Publicação','Processo no Tribunal Recurso','Tema',
              'Processo no Tribunal Recorrido','Parecer Ministério Publico','Peça Processual','Texto Parcial','Reclamações','Tribunal Recorrido','Referência a Doutrina','Doutrina']

var tribunais= {"Tribunal Constitucional": "atco1", "Tribunal dos Conflitos": "jcon", "Cláusulas Abusivas Julgadas pelos Tribunais": "jdgpj", 
                "Supremo Tribunal Administrativo": "jsta", "Supremo Tribunal de Justiça": "jstj", "Tribunal Central Administrativo Sul": "jtca", 
                "Tribunal Central Administrativo Sul - Contencioso Administrativo": "jtcampca", "Tribunal Central Administrativo Sul - Contencioso Tributário": "jtcampct", 
                "Tribunal Central Administrativo Norte": "jtcn", "Tribunal da Relação de Coimbra": "jtrc", "Tribunal da Relação de Évora": "jtre", 
                "Tribunal da Relação de Guimarães": "jtrg", "Tribunal da Relação de Lisboa": "jtrl", "Tribunal da Relação de Porto": "jtrp" } 


/* GET home page. */
router.get('/acordaos', function(req, res, next) {
  let page = req.query.page ? req.query.page : 0
  let pageDirection = req.query.pageDirection ? JSON.parse(req.query.pageDirection) : true

  query = ''
  for (let key in req.query){
    if (req.query[key] != '' && key != "page" && key != "pageDirection"){
        query += key + "=" + req.query[key] + "&"
    }
  }

  favorites = []
  axios.get(env.authAccessPoint + '/favorites?token=' + req.cookies.token)
    .then(favs => favorites = favs)
    .catch(err => console.log(err))

  axios.get("http://localhost:5555/acordaos?"+query+"page="+page+"&pageDirection="+pageDirection)
    .then(dados=>{
      res.render('main', { processos: dados.data, queries: req.query, page: page, pageDirection: pageDirection, tribunais: tribunais, favoritos: favorites});
    })
    .catch(erro=>{
      res.render('error', { error: erro,message:"Erro a obter lista de acordaos" });
    })
})


router.get('/acordaos/:id', function(req, res, next) {
  for (let key in req.query){
    if (key != "prevUrl" && key != "page" && key != "pageDirection")
      prevUrl += key + "=" + req.query[key] + "&"
  }

  axios.get("http://localhost:5555/acordaos/"+req.params.id)
      .then(acordao=>{
        res.render('pagAcordao', { acordao: acordao.data, tribunais: tribunais});
      })
      .catch(erro=>{
        res.render('error', { error: erro,message:"Erro a obter a página do acordao" });    
      })  
})


router.get('/edit/:id', function(req,res){
  axios.get("http://localhost:5555/acordaos/"+req.params.id)
  .then(acordao=>{
    res.render('editForm', { a: acordao.data, campos: campos });
  })
  .catch(erro=>{
    res.render('error', { error: erro,message:"Erro na obtenção do acordao" });    
  })  
})


router.get('/delete/:id', function(req, res) {
  axios.delete("http://localhost:5555/acordaos/"+req.params.id)
  res.redirect('/acordaos');
});

router.get('/add', function(req, res) {
  res.render('addForm', {campos: campos});
});


router.get('/alteracoes', function(req, res){
  res.render('alteracoes')
})


router.get('/login', function(req, res){           
  res.render('loginForm')
})

router.get('/register', function(req, res){           
  res.render('registerForm')
})

router.get('/', function(req, res) {
  res.redirect("/acordaos");
})


router.post('/edit/:id', function(req, res) {
  const descritores = req.body.Descritores.split('\n').map(linha => linha.toUpperCase())
  delete req.body.Descritores
  req.body["Descritores"] = descritores

  axios.put("http://localhost:5555/acordaos/"+req.params.id, req.body)
    .then(acordao => {
      //res.render('editConfirm', {a: acordao})
      res.redirect('/acordaos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do acordão"})
    })
})


router.post('/add', function(req, res) {
  const _id = parseInt(req.body._id)
  delete req.body._id
  req.body["_id"] = _id

  const descritores = req.body.Descritores.split('\n').map(linha => linha.toUpperCase())
  delete req.body.Descritores
  req.body["Descritores"] = descritores
  
  axios.post("http://localhost:5555/acordaos", req.body)
    .then(acordao => {
      //res.render('editConfirm', {a: acordao})
      res.redirect('/acordaos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na criação do acordão"})
    })
})

router.post('/login', function(req, res){
  axios.post(env.authAccessPoint +'/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      res.redirect('/acordaos')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

router.post("/register", (req, res) => {
  axios.post(env.authAccessPoint + "/register", req.body)
    .then(response => {
      res.redirect('/')
    })
    .catch(err => {
      res.render('error', {error: err})
    })
})

/*
router.get('/logout', verificaToken, (req, res) => {
  res.cookie('token', "revogado.revogado.revogado")
  res.redirect('/')
})

*/

module.exports = router;
