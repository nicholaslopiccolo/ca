var query = require('../workers/database').query;
var utils = require('../api/v1/utils');

module.exports = (_db) => {
    return {
        /**
         * Send to the client all the rows for the logged user.
         * @param {*} req request object form router
         * @param {*} res response object from router
         */
        lista: (req, res) => {
            // STEP 1 AUTH
            if (utils.hasSession(req)) {
                let id_user = req.session.user.id;
                // STEP 2 get list
                query('SELECT  * FROM PASTO WHERE ID_USER = $1;', [id_user], (err, response) => {
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
                err: 'Error Occurred'
            })
        },
        /**
         * Update pasto row.
         * @param {*} req request object form router
         * @param {*} res response object from router
         */
        update: (req, res) => {
            let pasto = req.body;
            // STEP 1 AUTH
            if (utils.hasAccess(req, "PASTO", pasto.id)) {
                // STEP 2 Update pasto
                query('UPDATE PASTO SET kcal = $1, data = $2, tipo = $3, descrizione = $4 WHERE id = $5;',
                    [pasto.kcal, pasto.data, pasto.tipo, pasto.descrizione, pasto.id], (err, response) => {
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
         * Delete pasto row.
         * @param {*} req 
         * @param {*} res 
         */
        delete: (req, res) => {
            // STEP 1 AUTH
            if (utils.hasAccess(req, "PASTO")) {
                let to_delete = req.params.id
                // STEP 2 delete
                query('DELETE FROM PASTO WHERE ID = $1;', [to_delete], (err, response) => {
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
         * Insert pasto row.
         * @param {*} req request object form router
         * @param {*} res response object from router
         */
        insert: (req, res) => {
            // STEP 1 AUTH
            if (utils.hasSession(req)) {
                let id_user = req.session.user.id;
                let pasto = req.body;
                // STEP 2 Insert
                query('INSERT INTO PASTO(id_user,kcal,tipo,descrizione,data) values ($1,$2,$3,$4,$5);',
                    [id_user, pasto.kcal, pasto.tipo, pasto.descrizione, pasto.data], (err, response) => {
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