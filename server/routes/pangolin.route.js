const { Router } = require("express");
const PangolinController = require("../controllers/pangolin.controller.js");

let router = Router();

router.get("/all", PangolinController.all_pangolin);
router.get("/one/:username", PangolinController.one_pangolin);
router.post("/search", PangolinController.search_pangolin);

module.exports = router;
