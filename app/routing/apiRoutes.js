//Import data js files
const friends = require("../data/friends");

//Function to get the most compatible friend
function getMostCompatibleFriend(friend) {
    //TODO add logic to get most compatible friend
    return (friends && friends.length > 0) ? friends[0] : null;
}

//Export the function
module.exports = function (app) {

    // Displays all friends
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    // Create New Friend - takes in JSON input
    app.post("/api/friends", function (req, res) {
        // Set the new friend variable to the body of the request which we are assuming it JSON because of the JSON Express middleware
        const newFriend = req.body;

        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newFriend.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
        console.log(newFriend);

        //Get the friend that is most compatible
        const compatibleFriend = getMostCompatibleFriend(newFriend);

        //Add the new friend to the fiends array
        friends.push(newFriend);        

        //Send back an object with the newly added friend and the fiend that is most compatible with them. 
        res.json({
            friendAdded: newFriend,
            mostCompatibleFriend: compatibleFriend
        });
    });
};

