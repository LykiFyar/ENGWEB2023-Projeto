var Arcordaos = require('../models/acordaos')

module.exports.list = (limit, next_id) =>{
    return Arcordaos.find({'_id': {'$gte': next_id}}, {"Processo":1, "Data do Acordão":1, "Relator":1, "Descritores":1}).sort("_id").limit(limit)
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


module.exports.acordaosDataDesde = (data, limit, next_id) =>{
    var date = new Date(data)
    return Arcordaos.aggregate([{$match: { 
                                        $expr: {
                                            $gte:[
                                                {$dateFromString: {dateString:'$Data do Acordão'}}, 
                                                date
                                            ]
                                        }
                                    }
                         }],{"Processo":1, "Data do Acordão":1, "Relator":1, "Descritores":1}).sort("_id").limit(limit)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosFilter = (queries, limit, next_id, pageDirection) => {
    delete queries.page
    delete queries.pageDirection

    console.log(next_id, pageDirection)

    if (!pageDirection) {
        queries["_id"] = {'$lt': next_id}
        return Arcordaos.find(queries, {"Processo":1, "Data do Acordão":1, "Relator":1, "Descritores":1}).sort({_id:-1}).limit(limit)
                    .then(dados=>{
                        return dados
                    })
                    .catch(erro=>{
                       return erro
                    })    
    }
    else{
        queries["_id"] = {'$gt': next_id}
        return Arcordaos.find(queries, {"Processo":1, "Data do Acordão":1, "Relator":1, "Descritores":1}).sort({_id:1}).limit(limit)
                    .then(dados=>{
                        return dados
                    }
                    )
                    .catch(erro=>{
                       return erro
                    })    
    }
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
