var express = require('express');
var router = express.Router();
var axios = require("axios")


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


/* GET home page. */
router.get('/acordaos', function(req, res, next) {
  let page = req.query.page ? req.query.page : 0
  let nextPage = req.query.nextPage ? req.query.nextPage : true

  query = ''
  for (let key in req.query){
    if (req.query[key] != '' && key != "page" && key != "nextPage"){
        query += key + "=" + req.query[key] + "&"
    }
}

  axios.get("http://localhost:5555/acordaos?"+query+"page="+page+"&nextPage="+nextPage)
    .then(dados=>{
      res.render('main', { processos: dados.data, page: page, queries: req.query });
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
    res.render('editForm', { a: acordao.data, campos: campos });
  })
  .catch(erro=>{
    res.render('error', { error: erro,message:"Erro na obtenção do acordao" });    
  })  
})


router.get('/add', function(req, res) {
  res.render('addForm', {campos: campos});
});

router.get('/faq', function(req, res){
  res.render('faq')
})


router.get('/login', function(req, res){           
  res.render('loginForm')
})


router.post('/edit/:id', function(req, res) {
  console.log(req.body)
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
