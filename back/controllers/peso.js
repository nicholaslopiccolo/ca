const express = require('express')
const router = express.Router();

module.exports = (_db) => {
    const pesoModel = require('../models/peso')(_db)

    // Lista pesi x users
    router.get('/', pesoModel.lista)

    // Modifica peso
    router.patch('/:id', pesoModel.update)

    // Delete peso
    router.delete('/:id', pesoModel.delete)

    // Aggiungi peso
    router.post('/', pesoModel.insert)

    return router
}

//app.use('/route',object);