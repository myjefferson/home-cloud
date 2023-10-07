const config = require('../configs/auth.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { findOneUserByUsername, createUser } = require('./UserController')


exports.Auth = (req, res) => {
    let user = findOneUserByUsernamePassword()
}

exports.changePassword = (req, res) => {
    let user = findOneUserByUsernamePassword()
}

exports.singUp = async (req, res) => {
    const user = await findOneUserByUsername(req.body.username)//.then(() => { result result.dataValues })
    if(!user){
        await createUser(req, res)
    }else{
        return res.status(401).send({
            message: 'Essa conta já existe'
        })
    }
}

exports.singIn = async (req, res) => {
    const user = await findOneUserByUsername(req.body.username)

    if(!user){
        return res.status(404).send({ message: "Usuário não encontrado" })
    }

    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.dataValues.password
    )

    if(!passwordIsValid){
        return res.status(401).send({
            accessToken: null,
            message: 'Senha inválida!'
        })
    }

    let token = jwt.sign({ username: user.email, password: req.body.password }, config.secret, {
        expiresIn: 86400 //24 horas
    })

    res.status(200).send({
        token: token
    })
}