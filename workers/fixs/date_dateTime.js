var fs = require('fs');

let file = __dirname+'/../../json_db/data.json';

fs.readFile(file,(err,data)=>{
    if(err) throw err;
    data = JSON.parse(data);
    for(chip in data){
        data[chip].peso.map(el=>{
            delete el.dateTime;
            el.dateTime = el.date;
            delete el.date;
        })
        data[chip].kcal.map(el=>{
            delete el.dateTime;
            el.dateTime = el.date;
            delete el.date;
        })
        //console.log(data[chip]);
    }
    fs.writeFileSync(file,JSON.stringify(data),(res)=>{});
});