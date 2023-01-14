const express = require('express')
const router = express.Router();

module.exports = (_db) => {
    const configurazioneModel = require('../models/configurazione')(_db)

    // Lista configurazioni
    router.get('/', configurazioneModel.lista)

    // Modifica configurazioni
    router.patch('/:key/:value', configurazioneModel.update)

    // Aggiungi configurazioni
    router.post('/:key/:value', configurazioneModel.insert)

    return router
}

//app.use('/route',object);