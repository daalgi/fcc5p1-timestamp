// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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


// Main API endpoint
app.get("/api/timestamp/:datestring", (req, res) => {
  let datestring = req.params.datestring;
  let date = 0;
  // Check if the datestring is in unix format
  if(!isNaN(datestring))    
    datestring = parseInt(datestring);

  // Create Date
  date = new Date(datestring);
  
  // Check if it is a valid Date
  if(date.toUTCString() === "Invalid Date")
      res.json({error: "Invalid date"});
  
  // Get the date
  res.json({unix: date.getTime(), utc: date.toUTCString()})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});