var fs = require('fs');
var md5 = require('md5');
var randtoken = require('rand-token');

var bd = require('./base_dati')

module.exports = {
    regLog(req, res) {
        let p = req.body;

        let index = md5(p.username + p.password + bd.SALT_USERS); // index del file user per ottenere il token

        console.log(`Tipo: ${p.tipo}`);
        // Read file users for check user registered or not

        try {
            fs.readFile(bd.FILE_USERS, (err, users) => {
                if (err) throw err;
                users = JSON.parse(users);
                switch (p.tipo) {
                    case 'sign-up': {
                        // 1 - check index username check password corretta
                        if (typeof users[p.username] === 'undefined') {
                            // create token
                            let token = randtoken.generate(16);
                            users[p.username] = new Object();
                            users[p.username][index] = bd.user_s;
                            users[p.username][index].secure.token = token;
                            // Push into file the new user with empty data (by base_dati);
                            fs.writeFile(bd.FILE_USERS, JSON.stringify(users), (err) => {
                                if (err) throw err;
                                console.log(`Nuovo user registrato: ${p.username}`);
                                fs.readFile(bd.FILE_DATA, (err, data) => {
                                    if (err) throw err;
                                    data = JSON.parse(data);
                                    // A rigor di logica non esiste
                                    data[token] = bd.data;
                                    fs.writeFile(bd.FILE_DATA, JSON.stringify(data), (err) => {
                                        if (err) throw err;
                                        console.log(`Base dati creata per lo user: ${p.username}`);
                                        // Set session after registration
                                        access(req, p, false);
                                        res.send({
                                            token: token,
                                            err: false,
                                            message: null
                                        });
                                    });
                                });
                            });
                        } else {
                            console.log('Error: sign-up');
                            res.send({
                                err: true,
                                message: 'Username exist!'
                            });
                        }
                        break;
                    }
                    case 'login': {
                        if (typeof users[p.username] !== 'undefined') {
                            if (typeof users[p.username][index] !== 'undefined') {
                                console.log(`User che esegue il login: ${p.username}`);
                                let info = users[p.username][index];
                                access(req, p, info.secure.admin);
                                res.send({
                                    err: false,
                                    message: null,
                                    token: info.secure.token
                                });

                            } else {
                                console.log('Error: login');
                                res.send({
                                    err: true,
                                    message: 'Bad login!'
                                });
                            }
                        } else {
                            console.log('Error: login');
                            res.send({
                                err: true,
                                message: 'Bad login!'
                            });
                        }
                        break;
                    }
                }
            });
        } catch (e) {
            //console.log(e);
            res.send(e);
        }
    }
};

function access(req, p, admin) {
    req.session.username = p.username;
    req.session.admin = admin;
}