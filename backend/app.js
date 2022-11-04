const mongoose = require("mongoose");
const express = require("express");
const cards = require("./routes/cards"); // importando o roteador
const users = require("./routes/users"); // importando o roteador

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware de autenticação
app.use((req, res, next) => {
  req.user = {
    _id: "634487a8c49a15e4b7ce160d", // cole o _id do usuário teste criado no passo anterior
  };

  next();
});

app.use("/", users, cards);

app.get("/", (req, res) => {
  res.status(404).send({ message: "Frontend ainda não conectado." });
});

app.get("*", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  // se tudo estiver funcionando, o console mostrará que a porta do aplicativo está escutando
  console.log(`O App está escutando na porta ${PORT}`);
});
