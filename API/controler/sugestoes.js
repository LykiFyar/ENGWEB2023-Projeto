var Sugestoes = require('../models/sugestoes')

var project = {"Username":1, "Data de Submissão":1, "Assunto":1, "Sugestão":1}


module.exports.list = (limit, next_id) =>{
    return Sugestoes.find({'_id': {'$gte': next_id}}, project).sort("_id").limit(limit)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                    return erro
                })
}


module.exports.getSugestao = id =>{
    return Sugestoes.findOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}


module.exports.getTotal = () =>{
    return Sugestoes.find({},{_id:1}).sort({ _id: -1 }).limit(1)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}


module.exports.addSugestao = (sugestao) => {
    return Sugestoes.collection.insertOne(sugestao)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
  }


module.exports.deleteSugestao = id =>{
    return Sugestoes.deleteOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}
