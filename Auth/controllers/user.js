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

module.exports.getUserFavorites = usr => {
    return User.findOne({username:usr}, {_id:0, favorites:1}).favorites
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

/*
module.exports.getUserFavoritesIDS = username => {
    return User.findOne({username:username}, {_id:0, favorites:1}).favorites.find({},{_id:1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}
*/

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
    return User.updateOne({username:id}, info)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserStatus = (id, status) => {
    return User.updateOne({username:id}, {active: status})
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
    return User.updateOne({username:id}, pwd)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addFavorite = (id, idAcord, note) => {
    return User.updateOne({username:id}, {$push : {favorites : {_id:idAcord, note:note}}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.removeFavorite = (id, idAcord) => {
    return User.updateOne({username:id}, {$pull : {favorites : {_id: idAcord}}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateFavoriteNote = (id, idAcord, newnote) => {
    return User.updateOne({username:id, "favorites._id": idAcord}, {$set : {"favorites.$.note" : newnote}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteUser = id => {
    return User.deleteOne({username:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}
 
