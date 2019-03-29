'use strict';
let fs = require('fs');
let path = require('path');
let http = require('http');

let staticBasePath = './src';

let staticServe = function(req, res) {
    let resolvedBase = path.resolve(staticBasePath);
    let safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    let fileLoc = path.join(resolvedBase, safeSuffix);

    fs.readFile(fileLoc, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }

        res.statusCode = 200;

        res.write(data);
        return res.end();
    });
};

let httpServer = http.createServer(staticServe);

httpServer.listen(3000);
