//Import data js files
const friends = require("../data/friends");

//Function to get the most compatible friend
function getMostCompatibleFriend(friendToCompare) {

    let mostCompatibleFriend = {
        totalScoreDifference: null,
        friendObject: null
    }

    //Compare the differences between the friend passed into the function
    //and all other friends 
    friends.forEach(friend => {
        if (friend.routeName !== friendToCompare.routeName) {

            const scoreDiffArray = [];

            //Loop thru all the scores and get the absolute difference between the current friend and the friend we're trying to compare to
            friend.scores.forEach((score, index) =>{
                scoreDiffArray.push(Math.abs(score - friendToCompare.scores[index]));
            });

            //Sum up the values in the scoreDiffArray and assign it to a new property called "totalScoreDifference"
            const totalScoreDifference = scoreDiffArray.reduce((total, num) => total + num);            

            //If the mostCompatibleFriend does not have one assigned or the total score difference for the current
            //friend is lower than the current most compatible friend then assign this friend as the most compatbile friend
            if (!mostCompatibleFriend.totalScoreDifference ||
                mostCompatibleFriend.totalScoreDifference < totalScoreDifference) {

                mostCompatibleFriend = {
                    totalScoreDifference: totalScoreDifference,
                    friendObject: friend
                };
            }
        }
    });

    //return the friend object for the most compatible friend
    return mostCompatibleFriend.friendObject;
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
        newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

        console.log(newFriend);

        //Get the friend that is most compatible
        const compatibleFriend = getMostCompatibleFriend(newFriend);

        // Use the routeName property as a key and see if the user already exists in the friends array.
        // If the friend already exists then replace that object with the new updated friend object. 
        // Else create a new friend
        let existingFriend = friends.find(friend => friend.routeName === newFriend.routeName);
        if (existingFriend) {
            friends.splice(friends.indexOf(existingFriend), 1, newFriend);
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

