const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/create", blogController.createBlog);

router.route("/")
    .get(blogController.allBlogs)
    .post(blogController.insertBlog);

router.route("/:id")
    .put(blogController.updateBlog)
    .delete(blogController.deleteBlog);

router.get("/edit/:id", blogController.editBlog);

router.get("/:slug", blogController.blogDetail);

module.exports = router;