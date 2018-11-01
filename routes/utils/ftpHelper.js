const FTP_CONFIG = require('./ftpConfig');
let Client = require('ssh2').Client;

let conn = new Client();
conn.on('ready', function () {
    console.log('Client :: ready');
    // conn.exec('uptime', function (err, stream) {
    //     if (err) throw err;
    //     stream.on('close', function (code, signal) {
    //         console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
    //         conn.end();
    //     }).on('data', function (data) {
    //         console.log('STDOUT: ' + data);
    //     }).stderr.on('data', function (data) {
    //         console.log('STDERR: ' + data);
    //     });
    // });
    conn.sftp(function (err, sftp) {
        if (err) throw err;
        // sftp.readdir('/home/nodesftp', function (err, list) {
        //     if (err) throw err;
        //     console.dir(list);
        //     conn.end();
        // })
        sftp.fastGet('/home/nodesftp/test.txt', './test.txt', function (err, result) {
            if (err) throw err;
            console.log(result);
            conn.end();
        })
    })
}).on('error', function(err){
    console.error(err);
}).connect(FTP_CONFIG);