const crypto = require('crypto');
const { execSync } = require('child_process')

function createComparisonSignature (body) {
  const hmac = crypto.createHmac('sha1', process.env.SECRET);
  const self_signature = hmac.update(JSON.stringify(body)).digest('hex');
  return `sha1=${self_signature}`; // shape in GitHub header
}

function compareSignatures (signature, comparison_signature) {
  const source = Buffer.from(signature);
  const comparison = Buffer.from(comparison_signature);
  return crypto.timingSafeEqual(source, comparison); // constant time comparison
}

function verifyGithubPayload (req, res, next) {
  const { headers, body } = req;

  const signature = headers['x-hub-signature'];
  const comparison_signature = createComparisonSignature(body);

  if (!compareSignatures(signature, comparison_signature)) {
    return res.status(401).send('Mismatched signatures');
  }

  const { action, ...payload } = body;
  req.event_type = headers['x-github-event']; // one of: https://developer.github.com/v3/activity/events/types/ 
  req.action = action;
  req.payload = payload;
  next();
};

function eventHandler (req, res) {
  console.log(req.event_type, req.action, req.payload);
  return res.send('got authentic event data through my new middleware!');
};


module.exports = function (app) {
  app.post('/glitch-deploy', verifyGithubPayload, eventHandler);
};