const express = require("express");
const router = express.Router();
const userCtrl = require("../Controller/user");
const {ValidateCreate, isRequestValidated} = require('../validation/user');

router.post("/signup", ValidateCreate, isRequestValidated, userCtrl.signUp);

module.exports = router;