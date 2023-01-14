var fs = require('fs');

var bd = require('./base_dati');

module.exports = {// Deve ricevere il pacchetto dati del vue lato client!!

    leggi(req, res) {
        //var s = req.session;// Session params
        let body = req.body;

        console.log('Leggo...');
        fs.readFile(bd.FILE_DATA, (err, data) => {
            if (err) throw err;
            try {
                let parseData = JSON.parse(data)[body.token];
                //console.log(parseData);
                res.send(parseData);
            } catch (e) {
                res.send(`err: ${e}`);
            }

        });
    },
    scrivi(req, res) {
        let body = req.body;

        console.log('Scrivo...');
        fs.readFile(bd.FILE_DATA, (err,data) => {
            if(err) res.send(`We got an error in writing: ${err}`);
            else {
                let parseData = JSON.parse(data);
                parseData[body.token] = body.dati;
                fs.writeFile(bd.FILE_DATA, JSON.stringify(parseData), (err) => {
                    if (err) res.send(`We got an error in writing: ${err}`);
                    else res.send('Ok');
                });
            }
        });
        //console.log(dati);
        
    },
};