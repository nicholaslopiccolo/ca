var query = require('../workers/database').query

module.exports = {
    login: (req, res) => {
        let login_data = req.body;
        console.log(login_data)
        query('select username,email,id,verified from users where username = $1 and password = $2;', [login_data.username.toLowerCase(),login_data.password],(err, response) => {
            if (!err && response.rows.length > 0) {
                //Setting session parameters
                let user = response.rows[0];
                req.session.user = user;
                res.send(req.session.user);
                return
            }
            res.status(405).send({
                err: 'incorrect username or password.',
                errMessage: err
            })
        })
    },
    updateUser: (req, res) => {// TO DO
        res.end()
    },
    updatePassword: (req, res) => {// TO DO
        res.end()
    },
    register: (req, res) => {// TO TERMINATE
        let login_data = req.body;
        // Check username
        query('select id from users where username = $1 or email = $2;',[login_data.username.toLowerCase(),login_data.email.toLowerCase()],(err, response) => {
            if (!err) {
                //Setting session parameters
                if (response.rowCount > 0) {
                    res.status(405).send({
                        err: 'username already exsist.'
                    })
                    return
                } else {
                    query('insert into users(username,password,email) values ($1,$2,$3);',[login_data.username.toLowerCase(),login_data.password,login_data.email.toLowerCase()],(err, response) => {
                        if (!err) {
                            res.send({
                                message: 'ok'
                            })
                            return
                        }
                        res.status(405).send({
                            err: 'error register.',
                            errMessage: err
                        })
                    })
                }
            } else res.status(405).send({
                err: 'email or username already in use.'
            })
        })
        // Generate verify id for email
        // Send email with template and button to /verify/verified_id
    },
    logout(req,res){
        req.session = null;
        res.send({});
    },
    verify(req,res){// TO DO
        const VERIFIED_ID = req.params.verified_id;
        res.send("correctly verified");
    }
}