const router = require("express").Router();
const getInfoApi = require("../controllers/info.controller");

router.get("/", getInfoApi);

module.exports = router;
