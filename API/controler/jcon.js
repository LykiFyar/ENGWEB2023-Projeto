var Jcon = require('../models/jcon')

module.exports.list = () =>{
    return Jcon.find({},{"Processo":1, "Data do Acordão":1, "Relator":1, "Descritores":1})
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

module.exports.acordaosDataDesde = (data) =>{
    var date = new Date(data)
    return Jcon.aggregate([{$match: { 
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

module.exports.acordaosDescritor = (descritor) =>{
    return Jcon.find({"Descritores":descritor})
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