var Atco = require('../models/atco')

module.exports.list = () =>{
    return Atco.find({},{"Processo":1, "Data do Acordão":1, "Relator":1, "Descritores":1})
                .then(dados=>{
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


module.exports.acordaosDataDesde = (data) =>{
    var date = new Date(data)
    return Atco.aggregate([{$match: { 
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

module.exports.acordaosDescritor = (descritor) =>{
    return Atco.find({"Descritores":descritor})
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
