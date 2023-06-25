var Arcordaos = require('../models/acordaos')

module.exports.list = () =>{
    return Arcordaos.find({},{"Processo":1, "Data do Acordão":1, "Relator":1, "Descritores":1})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.getAcordao = id =>{
    return Arcordaos.findOne({_id:id})
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
    return Arcordaos.aggregate([{$match: { 
                                        $expr: {
                                            $gte:[
                                                {$dateFromString: {dateString:'$Data do Acordão'}}, 
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
    return Arcordaos.find({"Processo":processo})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosRelator = (relator) =>{
    return Arcordaos.find({"Relator":relator})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosTribunal = (tribunal) =>{
    return Arcordaos.find({"tribunal":tribunal})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosDescritor = (descritor) =>{
    return Arcordaos.find({"Descritores":descritor})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.addAcordao = (acordao) => {
    return Arcordaos.collection.insertOne(acordao)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
  }

module.exports.deleteAcordao = id =>{
    return Arcordaos.deleteOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}
