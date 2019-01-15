//Add dependencies
const express = require("express");

//Set up the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Server Routes
const apiRoutes=require("./app/routing/apiRoutes");
apiRoutes(app);
const htmlRoutes=require("./app/routing/htmlRoutes");
htmlRoutes(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});