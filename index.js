const   http = require('http'), //creating a HHTP server
    path = require('path'),
        express = require('express'),//express is the module that responds to http requests sent over the web & routing
        fs = require('fs'),//File system functionalities
        xmlParse = require('xslt-processor').xmlParse, //XML Handling
        xsltProcess = require('xslt-processor').xsltProcess, //XSLT Handling
        router = express(),
        server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,'views')));//serving the folder the have been created to the web

router.get('/', function(req, res){

    res.writeHead(200, {'Content-Type' : 'text/html'});//Head of the http request -> http request is when a clist requests something from the server

    let xml = fs.readFileSync('menu.xml', 'utf8'),
        xsl = fs.readFileSync('menu.xsl', 'utf8');

        xml = xmlParse(xml);
        xsl = xmlParse(xsl);

        let html = xsltProcess(xml, xsl);

        res.end(html.toString());

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function()
{
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});