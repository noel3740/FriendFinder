//Add dependencies
const path = require("path");
const questions = require("../data/questions");

//Export the function
module.exports = function (app) {

    // Default route that sends the user first to the home page
    app.get("/", function (req, res) {
        res.render("home", { layout: "main" });
    });

    // Survey route that sends the user first to the survey page
    app.get("/survey", function (req, res) {
        res.render("survey", { questions, layout: "main" });
    });
}