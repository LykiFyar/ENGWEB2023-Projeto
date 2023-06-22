var Atco = require('../models/atco')

module.exports.list = () =>{
    return Atco.find()
                .then(dados=>{
                    console.log(dados)
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.getAcordao = id =>{
    return Atco.findOne({_id:id})
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
    return Atco.aggregate([{$match: {"data": {$gte: parseInt(data)}}}])
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}*/

module.exports.acordaosDescritor = () =>{
    return Atco.aggregate([{$unwind:"$operacoes"}, {$group: {_id:"$operacoes.codigo",nome: {$first:"$operacoes.nome"}, desc: { $first: "$operacoes.descricao" }}}])
                .then(dados=>{
                    return dados
                })
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosProcesso = (processo) =>{
    return Atco.find({"Processo":processo})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosRelator = (relator) =>{
    return Atco.find({"Relator":relator})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosTribunal = (tribunal) =>{
    return Atco.find({"tribunal":tribunal})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.addAcordao = (acordao) => {
    return Atco.collection.insertOne(acordao)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
  }

module.exports.deleteAcordao = id =>{
    return Atco.deleteOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}
