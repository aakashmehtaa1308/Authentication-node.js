const express = require("express");
const { requiresSignIn, hasAuthorization } = require("../controller/auth");
const router = express.Router();
const userCtrl = require("../Controller/user");
const {ValidateCreate, isRequestValidated} = require('../validation/user');

router.post("/signup", ValidateCreate, isRequestValidated, userCtrl.signUp);
router.get("/get_users", requiresSignIn, userCtrl.getAllUsers)
router.delete("/delete_user", requiresSignIn, hasAuthorization, userCtrl.remove)

module.exports = router;