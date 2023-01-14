var query = require('../workers/database').query
var utils = require('../api/v1/utils');

module.exports = (_db) => {
    return {
        /**
         * Send to the client all the configurazioni rows for the logged user.
         * @param {*} req request object from router
         * @param {*} res response object from router
         */
        lista: (req, res) => {
            // STEP 1 AUTH
            if (utils.hasSession(req)) {
                let id_user = req.session.user.id;
                // STEP 2 get list
                query('SELECT  * FROM CONFIGURAZIONI WHERE ID_USER = $1;', [id_user], (err, response) => {
                    if (!err) {
                        res.send(response.rows);
                        return
                    }
                    res.status(500).send({
                        err: 'Error',
                        errMessage: err
                    })
                })
            }
            res.status(405).send({
                err: 'Not Authorized!'
            })
        },
        /**
         * Update configurazioni row.
         * @param {*} req request object from router
         * @param {*} res response object from router
         */
        update: (req, res) => {
            let configurazioni = req.body;
            // STEP 1 AUTH
            if (utils.hasAccess(req, "CONFIGURAZIONI", configurazioni.id)) {
                // STEP 2 Update configurazioni
                query('UPDATE CONFIGURAZIONI SET nome = $1, valore = $2 WHERE id = $3;',
                    [configurazioni.nome, configurazioni.valore, configurazioni.id], (err, response) => {
                        if (!err) {
                            res.send("Ok!");
                            return
                        }
                        res.status(500).send({
                            err: 'Error',
                            errMessage: err
                        })
                    })
            }
            res.status(405).send({
                err: 'Not Authorized!'
            })
        },
        /**
         * Insert configurazioni row.
         * @param {*} req request object from router
         * @param {*} res response object from router
         */
        insert: (req, res) => {
            // STEP 1 AUTH
            if (utils.hasSession(req)) {
                let id_user = req.session.user.id;
                let configurazioni = req.body;
                // STEP 2 insert configurazioni
                query('INSERT INTO CONFIGURAZIONI(id_user,nome,valore) values ($1,$2,$3);',
                    [id_user, configurazioni.nome, configurazioni.valore], (err, response) => {
                        if (!err) {
                            res.send("Ok!");
                            return
                        }
                        res.status(500).send({
                            err: 'Error',
                            errMessage: err
                        })
                    })
            }
            res.status(405).send({
                err: 'Not Authorized!'
            })
        }
    }
}