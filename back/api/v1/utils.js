var query = require('../../workers/database').query

module.exports = {
    /**
     * 
     * @param {*} req for session information
     */
    hasSession(req) {
        return req.session === "undefined" ? false : true;
    },
    /**
     * 
     * @param {*} req for session information
     * @param {*} table 
     * @param {*} row_id 
     */
    hasAccess(req, table,r_id) {
        if (this.hasSession(req)) {
            let id_user = req.session.user.id
            let row_id = req.params.id ? req.params.id : r_id;

            query("select * from $1 x ,users u where x.id=$2 and u.id = $3 and u.id = x.id_user", [table, row_id, id_user], (err, response) => {
                if (err) return false
                if (response.rows.length > 0) return true
            })
        }
        return false
    }
}