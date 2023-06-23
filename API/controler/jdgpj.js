var Jdgpj = require('../models/jdgpj')

module.exports.list = () =>{
    return Jdgpj.find()
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.getAcordao = id =>{
    return Jdgpj.findOne({_id:id})
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
    return Jdgpj.aggregate([{$match: {"data": {$gte: parseInt(data)}}}])
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosDescritor = () =>{
    return Jdgpj.aggregate([{$unwind:"$operacoes"}, {$group: {_id:"$operacoes.codigo",nome: {$first:"$operacoes.nome"}, desc: { $first: "$operacoes.descricao" }}}])
                .then(dados=>{
                    return dados
                })
                .catch(erro=>{
                   return erro
                })
}*/

module.exports.acordaosProcesso = (processo) =>{
    return Jdgpj.find({"Processo":processo})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosRelator = (relator) =>{
    return Jdgpj.find({"Relator":relator})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosTribunal = (tribunal) =>{
    return Jdgpj.find({"tribunal":tribunal})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.addAcordao = (acordao) => {
    return Jdgpj.collection.insertOne(acordao)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
  }

module.exports.deleteAcordao = id =>{
    return Jdgpj.deleteOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}