var query = require('../workers/database').query
var utils = require('../api/v1/utils');

module.exports = {
    /**
     * Send to the client all the peso rows for the logged user.
     * @param {*} req request object from router
     * @param {*} res response object from router
     */
    lista: (req, res) => {
        // STEP 1 AUTH
        if (utils.hasSession(req)) {
            let id_user = req.session.user.id;
            // STEP 2 get list
            query('SELECT  * FROM PESO WHERE ID_USER = $1;', [id_user], (err, response) => {
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
     * Update peso row.
     * @param {*} req request object from router
     * @param {*} res response object from router
     */
    update: (req, res) => {
        let peso = req.body;
        // STEP 1 AUTH
        if (utils.hasAccess(req, "PESO", peso.id)) {
            // STEP 2 Update peso
            query('UPDATE PESO SET peso = $1, data = $2 WHERE id = $3;', [peso.peso, peso.data, peso.id], (err, response) => {
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
     * Delete peso row.
     * @param {*} req request object from router
     * @param {*} res response object from router
     */
    delete: (req, res) => {
        // STEP 1 AUTH
        if (utils.hasAccess(req, "PESO")) {
            let to_delete = req.params.id
            // STEP 2 delete peso
            query('DELETE FROM PESO WHERE ID = $1;', [to_delete], (err, response) => {
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
     * Insert peso row.
     * @param {*} req request object form router
     * @param {*} res response object from router
     */
    insert: (req, res) => {
        // STEP 1 AUTH
        if (utils.hasSession(req)) {
            let id_user = req.session.user.id;
            let peso = req.body;
            // STEP 2 insert peso
            query('INSERT INTO PESO(id_user,peso,data) values ($1,$2,$3);',
                [id_user, peso.peso, peso.data], (err, response) => {
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
}