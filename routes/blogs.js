const { Router, response } = require("express");
const postgres = require("../database/postgres")

const router = Router();

const blogsMockDB = [
    {
        "title": "abc",
        "blogText": "defdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkm"
    }, 
    {
        "title": "abc2",
        "blogText": "def2"
    },
    {
        "title": "abc",
        "blogText": "def"
    }, 
    {
        "title": "abc",
        "blogText": "defdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkm"
    }, 
    {
        "title": "abc2",
        "blogText": "def2"
    },
    {
        "title": "abc",
        "blogText": "def"
    }, 
    {
        "title": "abc",
        "blogText": "defdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkm"
    }, 
    {
        "title": "abc2",
        "blogText": "def2"
    },
    {
        "title": "abc",
        "blogText": "def"
    }, 
    {
        "title": "abc",
        "blogText": "defdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkmdefdfjdifjdifdfkdmkfmdkfdkfmkdmfkdmfkm"
    }, 
    {
        "title": "abc2",
        "blogText": "def2"
    },
    {
        "title": "abc",
        "blogText": "def"
    }, 
];

// Renders the home page which displays all the blogs
router.get("/home", (req, res) => {
    return res.render("home", {
        blogsMockDB: blogsMockDB
    });
});

// Given the blog title, it finds the blog and renders it
router.get("/view-blog", (req, res) => {
    const blogTitle = req.query.title; 
    const blog = blogsMockDB.find(blog => blog.title === blogTitle);
    return res.render("view-blog", {
        title: blog.title,
        blogText: blog.blogText
    });
});

// Renders the blog form page
router.get("/add-blog", (req, res) => {
    return res.render("blogsFormPage");
});

// POST API to add the blog
router.post("/addBlog", (req, res) => {
    // TODO: Add Http status code in response
    const{title, blog} = req.body;
    blogsMockDB.push({
        "title": title,
        "blogText": blog
    });
    return res.redirect("/blog/home");
});

module.exports = router;