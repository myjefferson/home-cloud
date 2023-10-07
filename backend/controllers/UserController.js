const bcryptjs = require('bcryptjs')
const User = require('../models/User')

exports.findAllUsers = async (req, res) => {
    await User.findAll()
    .then(user => {
        console.log("Lista de usuários")
    })
    .catch(error =>{
        console.log("Ocorreu um erro no banco de dados", error)
    })
}

exports.findOneUserById = async (id) => {
    await User.findOne({where: { id: id }})
    .then(user => {
        if(user){
            console.log("Usuário encontrado")
        }else{
            console.log("Nenhum usuário encontrado")
        }
    })
    .catch(error => {
        console.log("Ocorreu um erro no banco de dados")
    })
}

exports.findOneUserByUsername = async (username) => {
    return await User.findOne({where: { username: username }})
    .then(result => { return result })
    .catch(error => {
        console.log("Ocorreu um erro no banco de dados ao fazer a consulta dos usuários")
    })
}

exports.createUser = async (req, res) => {
    const user = req.body
    return await User.create({ 
        name: user.name,
        username: user.username,
        email: null,
        password: bcryptjs.hashSync(user.password, 8),
        limit_storage: user.limit_storage,
        role: user.role
    }).then(success => {
        return res.status(200).send({ success: 'Criado com sucesso' })
    }).catch(error => {
        return res.status(500).send({ error: `Ocorreu um erro ao criar o usuário: ${error}` })
    });
}