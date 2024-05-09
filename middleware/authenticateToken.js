const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];  // Expected format: "Bearer [token]"

  if (!token) {
      return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
          return res.sendStatus(403); // Forbidden 
      }

      req.user = user; // Add the decoded user to the request for further use in the route handler
      next(); // Proceeding
  });
}

module.exports = authenticateToken;