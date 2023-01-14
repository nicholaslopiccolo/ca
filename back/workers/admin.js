var fs = require('fs');
var bd = require('./base_dati');

module.exports = {
    check(req, res) {
        if (typeof req.session.admin !== 'undefined')
            if (req.session.admin == true) res.render('admin');
            else {
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};

                // render the error page
                res.status(err.status || 500);
                res.render('error.html');
            }
        else {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error.html');
        }
    },
    getData(req,res){
        if (typeof req.session.admin !== 'undefined')
            if (req.session.admin == true){
                //Read Dates
                fs.readFile(bd.FILE_USERS,(err,data)=>{
                    if(err) res.send(`We got an error in writing: ${err}`);
                    else{
                        let users = new Array();
                        data = JSON.parse(data);
                        for(let key in data)users.push(key);
                        res.send(users)
                    }
                });
            }
            else {
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};

                // render the error page
                res.status(err.status || 500);
                res.render('error.html');
            }
        else {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error.html');
        }
    }
};