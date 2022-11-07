const mongoose = require("mongoose");
const express = require("express");
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

//////////////////////cors
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
/////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.listen(PORT, () => {
  // se tudo estiver funcionando, o console mostrará que a porta do aplicativo está escutando
  console.log(`O App está escutando na porta ${PORT}`);
});
