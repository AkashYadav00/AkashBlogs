const path = require("path")
const express = require("express");
const redisCache = require('./database/redis');

const app = express();
const PORT = 8000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(PORT, () => console.log("Inital setup done"))