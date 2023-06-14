const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  username_1: {
    type: String,
    require: [true, "Veuillez ajouter votre nom pour la demande d'amis."],
  },
  username_2: {
    type: String,
    require: [
      true,
      "Veuillez ajouter le nom de votre ami pour la demande d'amis.",
    ],
  },
});

const Friend = mongoose.model("friends", FriendSchema);

module.exports = Friend;
