const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Autorização necessária" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return res.status(401).send({ message: "Autorização necessária" });
  }

  req.user = payload; // atribuindo o payload para o objeto de solicitação

  next(); // enviando a solicitação para o próximo middleware
};
