const Pangolin = require("../models/Pangolin");

const AuthController = {
  login: async (req, res) => {
    let { username, password } = req.body;

    let verify_user = await Pangolin.signin(username, password);

    if (verify_user) {
      return res.json({
        id: verify_user._id,
        username: verify_user.username,
        role: verify_user.role,
      });
    } else {
      return res.status(404).json({
        msg: "Le nom d'uitilisateur/ mot de passe est inccorect.",
      });
    }
  },
  register: async (req, res) => {
    let { username, password } = req.body;

    let user_pwd_hash = await Pangolin.HashPwd(password);

    await Pangolin.create({
      username: username,
      password: user_pwd_hash,
      role: "Guerrier",
    })
      .then((result) =>
        res.status(200).json({
          id: result._id,
          username: result.username,
          role: result.role,
        })
      )
      .catch((error) => res.status(500).json({ msg: error }));
  },
  update: async (req, res) => {
    let { id, username, password, role } = req.body;

    let verify_pangolin = await Pangolin.findById(id);

    if (verify_pangolin) {
      let user_pwd_hash = await Pangolin.HashPwd(password);

      await Pangolin.findByIdAndUpdate(id, {
        username: username,
        password: user_pwd_hash,
        role: role,
      })
        .then((result) =>
          res.status(200).json({
            id: result._id,
            username: result.username,
            role: result.role,
          })
        )
        .catch((error) => res.status(500).json({ msg: error }));
    } else {
      return res.status(404).json({ msg: error });
    }
  },
};

module.exports = AuthController;
