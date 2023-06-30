// Controlador para o modelo User

var User = require('../models/user')

// Devolve a lista de Users
module.exports.list = () => {
    return User
            .find()
            .sort('name')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getUser = username => {
    return User.findOne({username:username})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getUserFavorites = username => {
    return User.findOne({username:username}, {_id:0, favorites:1}).favorites
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addUser = u => {
    return User.create(u)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.updateUser = (id, info) => {
    return User.updateOne({_id:id}, info)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserStatus = (id, status) => {
    return User.updateOne({_id:id}, {active: status})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateLastAccess = (id, d) => {
    return User.updateOne({username:id}, {lastAccess: d})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserPassword = (id, pwd) => {
    return User.updateOne({_id:id}, pwd)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addFavorite = (id, obj) => {
    return User.updateOne({_id:id}, {$push : {favorites : obj}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.removeFavorite = (id, idAcord) => {
    return User.updateOne({_id:id}, {$pull : {favorites : {id: idAcord}}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateFavoriteNote = (id, idAcord, newnote) => {
    return User.updateOne({_id:id, "favorites.id": idAcord}, {$set : {"favorites.$.note" : newnote}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteUser = id => {
    return User.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}
 
