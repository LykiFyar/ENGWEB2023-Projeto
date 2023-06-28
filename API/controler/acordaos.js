var Arcordaos = require('../models/acordaos')

module.exports.list = (limit, last_id) =>{
    return Arcordaos.find({'_id': {'$gte': last_id}}, {"Processo":1, "Data do Acordão":1, "tribunal":1,"Relator":1, "Descritores":1}).sort("_id").limit(limit)
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


module.exports.acordaosDataDesde = (data, limit, last_id) =>{
    var date = new Date(data)
    return Arcordaos.aggregate([{$match: { 
                                        $expr: {
                                            $gte:[
                                                {$dateFromString: {dateString:'$Data do Acordão'}}, 
                                                date
                                            ]
                                        }
                                    }
                         }],{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).sort("_id").limit(limit)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosProcesso = (processo, limit, last_id) =>{
    return Arcordaos.find({"_id": {'$gte': last_id},"Processo":processo},{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).sort("_id").limit(limit)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosRelator = (relator, limit, last_id) =>{
    return Arcordaos.find({"Relator":relator, "_id": {'$gte': last_id}},{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).sort("_id").limit(limit)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosTribunal = (tribunal, limit, last_id) =>{
    return Arcordaos.find({"tribunal":tribunal, "_id": {'$gte': last_id}},{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).sort("_id").limit(limit)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosDescritor = (descritor, limit, last_id) =>{
    return Arcordaos.find({"Descritores":descritor, "_id": {'$gte': last_id}},{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).sort("_id").limit(limit)
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


module.exports.editAcordao = (id,acordao)=>{
    return Arcordaos.updateOne({_id:id},acordao)
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
