var Arcordaos = require('../models/acordaos')

module.exports.list = (pageNumber) =>{
    return Arcordaos.find({},{"Processo":1, "Data do Acordão":1, "tribunal":1,"Relator":1, "Descritores":1}).skip(7 * pageNumber).limit(7)
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


module.exports.acordaosDataDesde = (data, pageNumber) =>{
    var date = new Date(data)
    return Arcordaos.aggregate([{$match: { 
                                        $expr: {
                                            $gte:[
                                                {$dateFromString: {dateString:'$Data do Acordão'}}, 
                                                date
                                            ]
                                        }
                                    }
                         }],{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).skip(0).limit(7)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosProcesso = (processo, pageNumber) =>{
    return Arcordaos.find({"Processo":processo},{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).skip(0).limit(7)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosRelator = (relator, pageNumber) =>{
    return Arcordaos.find({"Relator":relator},{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).skip(0).limit(7)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosTribunal = (tribunal, pageNumber) =>{
    return Arcordaos.find({"tribunal":tribunal},{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).skip(0).limit(7)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.acordaosDescritor = (descritor,pageNumber) =>{
    return Arcordaos.find(
        {"Descritores":descritor},{"Processo":1, "Data do Acordão":1, "tribunal":1, "Relator":1, "Descritores":1}).skip(0).limit(7)
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
