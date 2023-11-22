const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookie = require("cookie-parser");
const RecipeRoutes = require("./routes/RecipeRoutes");

const app = express();
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://Hemu2503:2503131521@cluster1.jiwqwss.mongodb.net/Recipes"
);

const db = mongoose.connection;
db.on("open", () => {
  console.log("database connected");
});

db.on("error", (err) => {
  console.log("error in connecting to database", err);
});
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookie());

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use("/users", userRoutes);
app.use("/recipe", RecipeRoutes);

const port = 5500;
app.listen(port, () => {
  console.log("Server started on " + port);
});
// npx create-react-app frontend ctrl+`
// CRUD>npx create-react-app frontend