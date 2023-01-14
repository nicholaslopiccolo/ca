const express = require('express')
const router = express.Router();

module.exports = (_db) => {

    const userModel = require('../models/user')(_db)

    //Login
    router.get('/', (req, res) => {
        res.send(req.session.user)
    })
    // Modifica uno user
    router.patch('/', userModel.updateUser)

    // Registra by google
    router.get('/register/google', userModel.registerGoogle, (req, res) => {
        res.redirect('/')
    })
    return router
}