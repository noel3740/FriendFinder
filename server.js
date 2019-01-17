//Add dependencies
const express = require("express");
const exphbs = require("express-handlebars");

//Set up the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setup handlebars
//Set custom layout and partials directory
app.engine("handlebars", exphbs(
    {
        defaultLayout: "main",
        layoutsDir: 'app/public/views/layouts',
        partialsDir: 'app/public/views'
    }));

app.set("view engine", "handlebars");
//Set a custom views folder directory
app.set('views', __dirname + `/app/public/views`);

//Server Routes
const apiRoutes = require("./app/routing/apiRoutes");
apiRoutes(app);
const htmlRoutes = require("./app/routing/htmlRoutes");
htmlRoutes(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});