const Friend = require("../models/Friends");
const User = require("../models/Pangolin");

const FriendsController = {
  all_friend: async (req, res) => {
    const { username } = req.params;
    console.log(username);
    await Friend.find({
      $or: [{ username_1: username }, { username_2: username }],
    })
      .then((friends) => {
        let friends_list = friends.map((friend) => {
          return {
            id: friend._id,
            username_1: friend.username_1,
            username_2: friend.username_2,
          };
        });

        return res.json(friends_list);
      })
      .catch((error) => res.status(500).json({ msg: error }));
  },
  add: async (req, res) => {
    const { username, friend_username } = req.body;
    await Friend.create({
      username_1: username,
      username_2: friend_username,
    })
      .then((result) => {
        console.log(result);
        return res.json({ msg: "Votre amis à bien été ajouté." });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err });
      });
  },
  remove: async (req, res) => {
    const { id } = req.params;

    let verifyObj = await Friend.findById(id);

    console.table(verifyObj);

    if (verifyObj) {
      await Friend.deleteOne({
        username_1: verifyObj.username_1,
        username_2: verifyObj.username_2,
      })
        .then(() => {
          return res.json({ msg: "Votre amis à bien été supprimé." });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err });
        });
    } else {
      return res.status(404).json({ msg: "Erreur: Utiliasteur non trouvé" });
    }
  },
};

module.exports = FriendsController;
