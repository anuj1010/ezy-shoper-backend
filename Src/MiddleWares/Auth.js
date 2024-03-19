const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

const createAndSetToken = async (username, id, res) => {
  const token = jwt.sign({ username: username, id: id }, SECRET_KEY);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  // res.send({ username, id });
};
module.exports = { createAndSetToken, authenticateToken };
