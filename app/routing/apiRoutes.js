//Import data js files
const friends = require("../data/friends");

//Function to get the most compatible friend
function getMostCompatibleFriend(friend) {

    //Compare the differences between the friend passed into the function
    //and all other friends 

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

        // Using a RegEx Pattern to remove spaces from the new friends name so we can store it in a routeName property
        newFriend.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

        console.log(newFriend);

        //Get the friend that is most compatible
        const compatibleFriend = getMostCompatibleFriend(newFriend);

        // Use the routeName property as a key and see if the user already exists in the friends array.
        // If the friend already exists then update the friends data. 
        // Else create a new friend
        const existingFriend = friends.find(friend => friend.routeName === newFriend.routeName);
        if (existingFriend) {
            existingFriend = newFriend;
        } else {
            friends.push(newFriend);
        }

        //Send back an object with the newly added friend and the fiend that is most compatible with them. 
        res.json({
            friendAdded: newFriend,
            mostCompatibleFriend: compatibleFriend
        });
    });
};

