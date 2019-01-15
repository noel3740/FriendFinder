//Add dependencies
var path = require("path");

//Export the function
module.exports = function (app) {

    // Default route that sends the user first to the home page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // Survey route that sends the user first to the survey page
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
}