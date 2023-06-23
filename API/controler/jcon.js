var Jcon = require('../models/jcon')

module.exports.list = () =>{
    return Jcon.find()
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}


module.exports.getAcordao = id =>{
    return Jcon.findOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

/*
module.exports.acordaosData = (data) =>{
    return Jcon.aggregate([{$match: {"data": {$gte: parseInt(data)}}}])
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosDescritor = () =>{
    return Jcon.aggregate([{$unwind:"$operacoes"}, {$group: {_id:"$operacoes.codigo",nome: {$first:"$operacoes.nome"}, desc: { $first: "$operacoes.descricao" }}}])
                .then(dados=>{
                    return dados
                })
                .catch(erro=>{
                   return erro
                })
}*/

module.exports.acordaosProcesso = (processo) =>{
    return Jcon.find({"Processo":processo})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosRelator = (relator) =>{
    return Jcon.find({"Relator":relator})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosTribunal = (tribunal) =>{
    return Jcon.find({"tribunal":tribunal})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.addAcordao = (acordao) => {
    return Jcon.collection.insertOne(acordao)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
  }

module.exports.deleteAcordao = id =>{
    return Jcon.deleteOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}