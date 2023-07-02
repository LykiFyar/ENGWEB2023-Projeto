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
        query += key + "=" + req.query[key].toUpperCase() + "&"
    }
  }


  axios.get("http://localhost:5555/acordaos?"+query+"page="+page+"&pageDirection="+pageDirection)
    .then(dados=>{
      nRegistos = dados.data[0].message ? 0 : dados.data.length
      axios.get(env.authAccessPoint + '/isLogged?token=' + req.cookies.token)
      .then(obj => {
        axios.get(env.authAccessPoint + '/favorites?token=' + req.cookies.token) 
        .then(favs => {
          favorites = favs.data.map(a => a._id)
          res.render('main', { processos: dados.data.slice(0,7), nRegistos: nRegistos, queries: req.query, page: page, pageDirection: pageDirection, tribunais: tribunais, favoritos: favorites, path: req.originalUrl, isAdmin: obj.data.isAdmin, isLogged: obj.data.isLogged});
        })
        .catch(e => {
          res.render('main', { processos: dados.data.slice(0,7), nRegistos: nRegistos, queries: req.query, page: page, pageDirection: pageDirection, tribunais: tribunais, favoritos: [], path: req.originalUrl, isAdmin: obj.data.isAdmin, isLogged: obj.data.isLogged})
        })
      })
      .catch(e => {
        res.render('main', { processos: dados.data.slice(0,7), nRegistos: nRegistos, queries: req.query, page: page, pageDirection: pageDirection, tribunais: tribunais, favoritos: [], path: req.originalUrl, isAdmin: false, isLogged: false})
      })
      
      
    })
    .catch(erro=>{
      res.render('error', { error: erro, message:"Erro a obter lista de acordaos" });
    })
})


router.get('/acordaos/:id', function(req, res, next) {
  axios.get("http://localhost:5555/acordaos/"+req.params.id)
      .then(acordao=>{
        res.render('pagAcordao', { acordao: acordao.data, tribunais: tribunais});
      })
      .catch(erro=>{
        res.render('error', { error: erro,message:"Erro a obter a página do acordao" });    
      })  
})


router.get('/edit/:id', function(req,res){
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && obj.data.isAdmin) {
      axios.get("http://localhost:5555/acordaos/"+req.params.id)
      .then(acordao=>{
        res.render('editForm', { a: acordao.data, campos: campos });
      })
      .catch(erro=>{
        res.render('error', { error: erro,message:"Erro na obtenção do acordao" });    
      })  
    }
    else
      res.redirect("/")
  })
  .catch(e => {
    res.redirect("/")
  })  
})


router.get('/delete/:id', function(req, res) {
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
    .then(obj => {
      if(obj.data.isLogged && obj.data.isAdmin){
        axios.delete("http://localhost:5555/acordaos/"+req.params.id)
        res.redirect('/acordaos')
      }
      else
        res.redirect("/")
    })
    .catch(e => {
      res.redirect("/")
    })
  
});


router.get('/add', function(req, res) {
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && obj.data.isAdmin)
      axios.get("http://localhost:5555/acordaos/total")
        .then(total => {      
          const _id = total.data[0]._id+1
          res.render('addForm', {campos: campos, id: _id});
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro ao atribuir id"})
        })
    else
      res.redirect('/')
  })
  .catch(e => {
    res.redirect('/')
  }) 
  
});

router.get('/perfil', function(req, res) {
  axios.get(env.authAccessPoint + '/getUsername?token=' + req.cookies.token)
  .then(username => {
    axios.get(env.authAccessPoint + '/' + username.data + '?token=' + req.cookies.token)
      .then(user => {
        res.render('pagUser', {user: user.data["dados"]});
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro na obtenção do user"})
      })
  })
  .catch(erro => {
    res.redirect("/login")
  })
});

router.get('/login', function(req, res){  
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged)
      res.redirect("/")
    else
      res.render('loginForm')
  })
  .catch(e => {
    res.render('loginForm')
  })            
  
})

router.get('/register', function(req, res){   
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && !obj.data.isAdmin)
      res.redirect("/")
    else
      res.render('registerForm', {isLogged: obj.data.isLogged, isAdmin: obj.data.isAdmin})
  })
  .catch(e => {
    res.render('registerForm')
  })        
  
})

router.get('/', function(req, res) {
  res.redirect("/acordaos");
})


router.post('/edit/:id', function(req, res) {
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && obj.data.isAdmin){
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
    }
    else
      res.redirect("back")
  })
  .catch(e => {
    res.redirect("back")
  })  

  
})


router.post('/add', function(req, res) {
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && obj.data.isAdmin){
      const id = parseInt(req.body._id)
      delete req.body._id
      req.body["_id"] = id


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
    }
    else
      res.redirect("back")
  })
  .catch(e => {
    res.redirect("back")
  })  


  
})

router.post('/addfavorite/:id', function(req,res) {
  if(req.cookies.token) {
    axios.get(env.authAccessPoint+'/addfavorite/' + req.params.id + "?token=" + req.cookies.token)
      .then(dados => res.redirect(req.body.path))
      .catch(err => res.redirect(req.body.path))
  }
})

router.post('/removefavorite/:id', function(req,res) {
  if(req.cookies.token) {
    axios.delete(env.authAccessPoint+'/deletefavorite/' + req.params.id + "?token=" + req.cookies.token)
      .then(dados => res.redirect(req.body.path))
      .catch(err => res.redirect(req.body.path))
  }
})


router.post('/login', function(req, res){
  axios.post(env.authAccessPoint +'/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      res.redirect('/acordaos')
    })
    .catch(e =>{
      console.log(e)
      res.render('loginForm', {errormessage: "Credenciais inválidas. Tente novamente!"})
    })
})

router.post("/register", (req, res) => {
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && !obj.data.isAdmin)
      axios.post(env.authAccessPoint + "/register", req.body)
      .then(response => {
        res.redirect('/')
      })
      .catch(err => {
        res.render('error', {error: err})
      })
    else
    res.redirect('back')
  })
  .catch(e => {
    res.redirect('back')
  }) 
  
  
  
})


router.get('/logout', (req, res) => {
  res.cookie('token', undefined)
  res.redirect('/')
})


router.get('/sugestoes', function(req, res, next) {
  let page = req.query.page ? req.query.page : 0

  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && obj.data.isAdmin)
      axios.get("http://localhost:5555/sugestoes?page="+page)
        .then(dados=>{
          nRegistos = dados.data[0].message ? 0 : dados.data.length
          res.render('sugestoes', { sugestoes: dados.data.slice(0,7), nRegistos: nRegistos, page: page, isAdmin: obj.data.isAdmin, isLogged: obj.data.isLogged});
        })
        .catch(erro=>{
          res.render('error', { error: erro, message:"Erro a obter lista de sugestoes" });
        })
    else
      res.redirect('/')
  })
  .catch(e => {
    res.redirect('/')
  }) 

  
})


router.get('/sugestoes/:id', function(req, res, next) {
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && obj.data.isAdmin)
      axios.get("http://localhost:5555/sugestoes/"+req.params.id)
      .then(sugestao=>{
        res.render('pagSugestao', { sugestao: sugestao.data});
      })
      .catch(erro=>{
        res.render('error', { error: erro,message:"Erro a obter a página do acordao" });    
      })  
    else
      res.redirect('/')
  })
  .catch(e => {
    res.redirect('/')
  })      
})


router.get('/add/sugestoes', function(req, res){
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged)
        axios.get("http://localhost:5555/sugestoes/total")
        .then(total => {
          const _id = total.data.length == 0 ? 0 :total.data[0]._id+1
          res.render('sugestoesForm', {id: _id})
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro ao atribuir id de sugestão"})
      })
    else
      res.redirect('/')
  })
  .catch(e => {
    res.redirect('/')
  }) 


  
})


router.post('/perfil/:id', function(req, res){
  console.log(req.params.id)  
  console.log(req.body)

  axios.post(env.authAccessPoint + '/updatefavorite/' + req.body._id + '?token=' + req.cookies.token, req.body)
    .then(dados => {      
      res.redirect('/acordaos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao atribuir uma descrição ao favorito"})
  })
})


router.post('/add/sugestao', function(req, res) {
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged){
      const id = parseInt(req.body._id)
      delete req.body._id
      req.body["_id"] = id

      const dataSubmissao = new Date()
      req.body["Data de Submissão"] = dataSubmissao

      axios.get(env.authAccessPoint +'/getUsername?token='+ req.cookies.token)
        .then(username => {
          req.body["Username"] = username.data

          axios.post("http://localhost:5555/sugestoes", req.body)
          .then(sugestao => {
            res.redirect('/')
          })
          .catch(erro => {
            res.render('error', {error: erro, message: "Erro no envio de sugestao"})
          })
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro ao obter o username"})
        })
    }
    else
      res.redirect("back")
  })
  .catch(e => {
    res.redirect("back")
  })  
  
})


router.get('/delete/sugestao/:id', function(req, res) {
  axios.get(env.authAccessPoint+"/isLogged?token=" + req.cookies.token)
  .then(obj => {
    if(obj.data.isLogged && obj.data.isAdmin){
      axios.delete("http://localhost:5555/sugestoes/"+req.params.id)
      res.redirect('/sugestoes');
    }
    else
      res.redirect("/")
  })
  .catch(e => {
    res.redirect("/")
  })  
  
});


module.exports = router;
