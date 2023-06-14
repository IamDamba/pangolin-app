const Pangolin = require("../models/Pangolin");

const PangolinController = {
  all_pangolin: async (req, res) => {
    await Pangolin.find({})
      .then((pangolins) => {
        return res.json(pangolins);
      })
      .catch((error) => res.status(500).json({ msg: error }));
  },
  one_pangolin: async (req, res) => {
    let { username } = req.params;
    console.log(username);

    await Pangolin.find({ username: username })
      .then((pangolin) => {
        console.log(pangolin);
        return res.json({
          id: pangolin[0]._id,
          username: pangolin[0].username,
          role: pangolin[0].role,
        });
      })
      .catch(() =>
        res.status(404).json({ msg: "L'utilisateur n'a pas été trouvé" })
      );
  },
  search_pangolin: async (req, res) => {
    let { username, friend_username } = req.body;

    await Pangolin.find({
      username: new RegExp(friend_username, "i"),
    })
      .then((pangolins) => {
        let pangolin_filter = pangolins.filter(
          (pangolin) => pangolin.username != username
        );
        return res.json(pangolin_filter);
      })
      .catch(() =>
        res.status(404).json({ msg: "Le pangolin n'a pas été trouvé" })
      );
  },
};

module.exports = PangolinController;
