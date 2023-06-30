var Acordaos = require('../models/acordaos')

var project = {"Processo":1, "Data do Acordão":1, "tribunal":1,"Relator":1, "Descritores":1}
/*
module.exports.list = (limit, next_id) =>{
    return Acordaos.aggregate
    ([
        {
            $match: {'_id': {'$gte': next_id} }
        },
        {   
            $sort: {_id:1}
        },
        {
            $project: project
        },
        {
            $facet:
            {
                "Registos":
                [
                    {
                        $limit: limit
                    }
                ],
                "Paginas":
                [
                    {
                        "$count":"Total"
                    }
                ]
            } 
        }
    ])
    .then(dados=>{
        return dados
    })
    .catch(erro=>{
        return erro
    })
}*/

module.exports.list = (limit, next_id) =>{
    return Acordaos.find({'_id': {'$gte': next_id}}, project).sort("_id").limit(limit)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                    return erro
                })
}

module.exports.getAcordao = id =>{
    return Acordaos.findOne({_id:id})
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
    return Acordaos.aggregate([{$match: { 
                                        $expr: {
                                            $gte:[
                                                {$dateFromString: {dateString:'$Data do Acordão'}}, 
                                                date
                                            ]
                                        }
                                    }
                         }],project).sort("_id").limit(limit)
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
        return Acordaos.find(queries, project).sort({_id:-1}).limit(limit)
                    .then(dados=>{
                        return dados
                    })
                    .catch(erro=>{
                       return erro
                    })    
    }
    else{
        queries["_id"] = {'$gt': next_id}
        return Acordaos.find(queries, project).sort({_id:1}).limit(limit)
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
    return Acordaos.collection.insertOne(acordao)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
  }


module.exports.editAcordao = (id,acordao)=>{
    return Acordaos.updateOne({_id:id},acordao)
            .then(dados=>{
                return dados
            }
            )
            .catch(erro=>{
                return erro
            })
}


module.exports.deleteAcordao = id =>{
    return Acordaos.deleteOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}
