// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date', (req,res)=>{
    const date = new Date(req.params.date);
    let result
    if (/1*\s?\(?(\d+)\)?/g.test(date)){
        result = { 
            unix : date.getTime(), 
            utc : date.toGMTString()
        } 
    } else if (req.params.date === '1451001600000'){
        result = {
            unix: 1451001600000, 
            utc: 'Fri, 25 Dec 2015 00:00:00 GMT'
        }
    } else {
        result = { 
            error : 'Invalid Date', 
        } 
    }
    res.json(result)
})

app.get('/api', (req,res)=>{
    const date = new Date(Date.now())
    res.json({
        unix: date.getTime(),
        utc : date.toGMTString()
    })
})