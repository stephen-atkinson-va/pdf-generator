const express = require('express');
const app = express();
var port = process.env.PORT || 3000;

const fs = require('fs');
const pdf = require('html-pdf');

app.get('/', (req, res) => res.send('Hello World !!'));

app.get('/toast', (req, res) => res.send('Hello toast !!'));

app.get('/pdf', (req, res) => {

    var data = fs.readFileSync('pdf.html', 'utf8');

    pdf.create(data).toBuffer(function(err, buffer){

        let x = new Uint8Array(buffer);

        var arr = []; 
        for(var p in Object.getOwnPropertyNames(x)) {
            arr[p] = x[p];
        }

        res.setHeader('Content-disposition', 'inline; filename=' + "invoice.pdf");
        res.setHeader('Content-type', 'application/pdf');

        res.send(buffer);
      });

});

app.listen(port, () => console.log('Server is running on port ' + port));