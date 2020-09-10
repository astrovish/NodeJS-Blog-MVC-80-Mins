const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        desc: "Title of the blog",
        trim: true,
        type: String,
        required: true
    },
    body: {
        desc: "Description of the blog",
        trim: true,
        type: String,
        required: true
    },
    userId: {
        type: Number,
        default: 56,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

blogSchema.pre("validate", function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true,
        })
    }
    next();
})

module.exports = mongoose.model("Blog", blogSchema);