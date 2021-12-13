const express = require("express");
const router = express.Router();

const authCtrl = require("../Controller/auth");

router.post("/signin", authCtrl.signIn);
router.post("/signout", authCtrl.signOut);

module.exports = router;
