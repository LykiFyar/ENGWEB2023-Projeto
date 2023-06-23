var Jdgpj = require('../models/jdgpj')

module.exports.list = () =>{
    return Jdgpj.find({},{"Processo":1, "Data do Acordão":1, "Relator":1, "Descritores":1})
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


module.exports.acordaosDataDesde = (data) =>{
    var date = new Date(data)
    return Jdgpj.aggregate([{$match: { 
                                        $expr: {
                                            $gte:[
                                                {$dateFromString: {dateString:  '$Data do Acordão'}}, 
                                                date
                                            ]
                                        }
                                    }
                         }])
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}


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

module.exports.acordaosDescritor = (descritor) =>{
    return Jdgpj.find({"Descritores":descritor})
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