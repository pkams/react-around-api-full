const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const cards = require("./routes/cards"); // importando o roteador
const users = require("./routes/users"); // importando o roteador

const { createUser, login } = require("./controllers/users");
const auth = require("./middleware/auth");

require("dotenv").config();

// conecte ao servidor MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb", function (err, db) {
  if (err) {
    console.log(
      "Incapaz de conectar ao BD. Por favor, restarte o servidor. Erro:",
      err
    );
  } else {
    console.log("Sucesso ao conectar ao BD!");
  }
});

// escute o port 3000
const { PORT = 3000 } = process.env;

const app = express();

// cors
app.use(cors());
app.options("*", cors()); //habilite solicitações para todas as rotas

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// crash test
//app.get("/crash-test", () => {
//  setTimeout(() => {
//    throw new Error("O servidor travará agora");
//  }, 0);
//});

app.post("/signin", login);
app.post("/signup", createUser);

// autorização
app.use(auth);

app.use("/", users, cards);

app.get("/", (req, res) => {
  res.status(404).send({ message: "Frontend ainda não conectado." });
});

app.get("*", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.use((err, req, res, next) => {
  // se um erro não tiver status, exibir 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // verifique o status e exiba uma mensagem baseada nele
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
});

app.listen(PORT, () => {
  // se tudo estiver funcionando, o console mostrará que a porta do aplicativo está escutando
  console.log(`O App está escutando na porta ${PORT}`);
});
