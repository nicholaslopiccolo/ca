const express = require('express');
const router = express.Router(); 

module.exports = (_db) => {
    const pastoModel = require('../models/pasto')(_db)

    // Lista pasti x user
    router.get('/', pastoModel.lista)

    // Modifica pasto
    router.patch('/:id', pastoModel.update)

    // Delete pasto
    router.delete('/:id', pastoModel.delete)

    // Aggiungi pasto
    router.post('/', pastoModel.insert)

    return router
}

//app.use('/route',object);