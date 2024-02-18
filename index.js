const path = require("path")
const express = require("express");
const redisClient = require('./database/redis');
const postgresClient = require("./database/postgres")
const blogRoute = require("./routes/blogs");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false})); // this is required since we are working with forms

app.get("/", (req, res) => {
    res.redirect("/blog/home");
});

app.use("/blog", blogRoute)
postgresClient.init();
redisClient.init();

app.listen(PORT, () => console.log("Inital setup done"))