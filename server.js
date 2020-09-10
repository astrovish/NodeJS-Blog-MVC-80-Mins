const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const blogRoute = require("./routes/blogRoutes");

// creating an express application
const app = express();

// configuring path to .env file
dotenv.config({path: "./config/config.env"});

// setting up view engine
app.set("view engine", "ejs");

// setting up path of view folder
app.set("views", process.env.VIEWS_FOLDER);

// use /public directory for static files
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

// blog routes
app.use("/blogs", blogRoute);

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false    
})
.then(result => {
    // listening application on assigned port
    const PORT = process.env.PORT || 3900;
    app.listen(PORT, () => {
        console.log(`Application is up and running on port: ${PORT}`);
    })

    console.log("Application successfully connected with database.")
})
.catch(err => {
    console.log(`Following error occured while connecting with database: ${err}`)
})

// home page
app.get("/", (req, res) => {
    res.render("index", {
        pageTitle: "Home Page"
    })
})

app.use((req, res) => {
    res.render("404", {
        pageTitle: "OOPS!!! Page Not Found"
    })
})