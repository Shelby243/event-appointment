const JWT = require("jsonwebtoken");

const middlewares = async (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.json({
          success: 0,
          message: "Invalid token",
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "Access denied unauthorized user",
    });
  }
};
const middlewares1 = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

module.exports = { middlewares, middlewares1 };

{
  /**
async (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.json({
          success: 0,
          message: "Invalid token",
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "Access denied unauthorized user",
    });
  }
};


 try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
 */
}
