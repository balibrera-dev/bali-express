// CORS middleware
const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `http://localhost:3000`);
  res.header(`Access-Control-Allow-Methods`, `GET,PATCH,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

module.exports = allowCrossDomain;
