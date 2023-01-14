const express = require('express')
const router = express.Router();


module.exports = (_db)=>{
    const userAPI = require('../../controllers/user')(_db);
    const pesoAPI = require('../../controllers/peso')(_db);
    const pastoAPI = require('../../controllers/pasto')(_db);
    const configurazioneAPI = require('../../controllers/configurazioni')(_db);

    router.use('/user', userAPI)
    router.use('/peso', pesoAPI)
    router.use('/pasto', pastoAPI)
    router.use('/configurazione', configurazioneAPI)

    return router
}