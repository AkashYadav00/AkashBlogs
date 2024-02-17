const path = require("path")
const express = require("express");
const redisCache = require('./database/redis');
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

app.listen(PORT, () => console.log("Inital setup done"))