const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080

app.use(express.static('./dist/angular-levelup'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/angular-levelup/index.html'));
});

app.listen(port);