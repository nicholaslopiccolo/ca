var schedule = require('node-schedule');
var backup = require('./backup');
 
//Ogni lunedì alle 12, fa il backup dei dati '0 12 * * 0'
var doBackup = schedule.scheduleJob('* * * * *',function(){
    backup.save();
});