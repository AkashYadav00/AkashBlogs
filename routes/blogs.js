const postgresClient = require("../database/postgres")
const redisClient = require("../database/redis");
const { Router } = require("express");

const router = Router();

// Renders the home page which displays all the blogs
router.get("/home", async (req, res) => {
    const blogs = await postgresClient.selectAllFromBlog();
    return res.render("home", {
        blogsList: blogs
    });
});

// Given the blog title, it finds the blog and renders it
router.get("/view-blog", async (req, res) => {
    const blogId = req.query.blogId; 
    const redisKey = "blogs:" + blogId;
    let blog = await redisClient.get(redisKey);
    if (blog === null) {
        blog = await postgresClient.findBlogFromId(blogId);
        await redisClient.set(redisKey, blog);
    }
    return res.render("view-blog", {
        title: blog[0].title,
        blogText: blog[0].content
    });
});

// Renders the blog form page
router.get("/add-blog", (req, res) => {
    return res.render("blogsFormPage");
});

// POST API to add the blog
router.post("/addBlog", async (req, res) => {
    // TODO: Add Http status code in response
    const{title, blog} = req.body;
    await postgresClient.insertBlogIntoDatabase(title, blog);
    return res.redirect("/blog/home");
});

module.exports = router;