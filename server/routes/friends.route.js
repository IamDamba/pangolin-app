const { Router } = require("express");
const FriendsController = require("../controllers/friends.controller.js");

let router = Router();

router.get("/all/:username", FriendsController.all_friend);
router.post("/add", FriendsController.add);
router.delete("/remove/:id", FriendsController.remove);

module.exports = router;
