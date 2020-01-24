const friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  app.post("/api/friends", function(req, res) {
    //insert logic here that handles compatability
    const userData = req.body;
    const userScore = userData.scores;
    let bestMatch = {
      name: "",
      photo: "",
      friendDiff: Infinity
    };

    let totalDifference;

    for (let i = 0; i < friends.length; i++) {
      const currentFriend = friends[i];
      totalDifference = 0;
      for (let j = 0; j < currentFriend.scores.length; j++) {
        const currentFriendScore = currentFriend.scores[j];
        totalDifference += Math.abs(
          parseInt(userScore[j]) - parseInt(currentFriendScore)
        );
      }
      if (totalDifference <= bestMatch.friendDiff) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDiff = totalDifference;
      }
    }

    friends.push(userData);

    res.json(bestMatch);
  });
};
