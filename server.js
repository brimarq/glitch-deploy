require('dotenv').config();
const express = require('express');
const app = express();
const glitchDeployRoute = require('./routes/glitch-deploy');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

glitchDeployRoute(app);

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
