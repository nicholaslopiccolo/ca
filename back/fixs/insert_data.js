var pool = require('../workers/database');
var fs = require('fs')

let dati_json = JSON.parse(fs.readFileSync('../json_db/data.json','utf-8'));

let dati_peso = dati_json.peso;
let dati_pasto = dati_json.kcal;

let sql_peso = 'insert into peso(id_user,peso,data) values'
let sql_pasto = 'insert into pasto(id_user,kcal,tipo,descrizione,data) values'

dati_peso.forEach((el, i)=> {
    let value = `\n(1,${el.peso},'${el.dateTime}')`
    
    if(dati_peso.length-1==i)sql_peso+=value
    else sql_peso+=value+','
});

console.log(sql_peso)

dati_pasto.map(async(el, i)=> {
        let value = `\n(1,${el.kcal},'${el.tipo.toLowerCase()}','${el.desc.replace("'",'i ')}','${el.dateTime}')`
        
        if(dati_peso.length-1!=i)sql_pasto+=value+','
        else sql_pasto +=value
})

console.log(sql_pasto)
