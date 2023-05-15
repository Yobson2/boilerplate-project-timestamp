// index.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();
const port=3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res, next) => {
  const dateParam = req.params.date;
  let timestamp;
  let time;

  if (Number(dateParam)) {
    timestamp = parseInt(dateParam);
    time = new Date(timestamp).toString().slice(0, 28);
  } else {
    time = new Date(dateParam).toString().slice(0, 28);
    timestamp = new Date(dateParam).getTime();
  }

  res.json({
    "unix": timestamp,
    "utc": time
  });
});


// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

app.listen(port,()=> console.log('Your app is listening on port ' + port))
