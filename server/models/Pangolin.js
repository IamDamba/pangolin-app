const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const PangolinSchema = new mongoose.Schema({
  password: {
    type: String,
    require: [
      true,
      "Mot de passe / nom utilisateur est incorrect, veuillez réessayer.",
    ],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  username: {
    type: String,
    unique: true,
    require: [
      true,
      "Mot de passe / nom utilisateur est incorrect, veuillez réessayer.",
    ],
    minlength: [3, "Minimum password length is 3 characters"],
  },
  role: {
    type: String,
    require: [true, "Veuillez donner un role"],
  },
});

PangolinSchema.statics.HashPwd = async function (password) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

PangolinSchema.statics.signin = async function (username, password) {
  const user = await this.findOne({ username });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    return null;
    // throw Error("Incorrect Password");
  }
  return null;
  // throw Error("Incorrect Email");
};

const Pangolin = mongoose.model("pangolin", PangolinSchema);

module.exports = Pangolin;
