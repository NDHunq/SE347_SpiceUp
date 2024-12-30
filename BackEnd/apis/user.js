const express = require("express");
const router = express.Router();

const userController = require("../controllers/user/UserController");
const authenticate = require("../middlewares/auth/auth");

router.use(express.json());
router.use("/info/update/:user_id", authenticate, userController.updateInfo);
router.use("/info/:user_id", authenticate, userController.getInfo);
router.use("/info", authenticate, userController.getInfo);

router.use("/reset_password/send", userController.sendResetLink);
router.use("/reset_password/:token", userController.resetPassword);

router.use(express.json());
router.use("/info/update/:user_id", authenticate, userController.updateInfo);
router.use("/info/:user_id", authenticate, userController.getInfo);
router.post("/info2", authenticate, userController.getInfo2);

router.use(
  "/change_password/:user_id",
  authenticate,
  userController.changePassword
);

router.use("/reset_password/send", userController.sendResetLink);
router.use("/reset_password/:token", userController.resetPassword);

router.use("/change_password/:user_id", userController.changePassword);

router.use("/reset_password/post", userController.resetPassword);

router.post(
  "/billingAddress/:user_id",
  authenticate,
  userController.setBillingAddress
);

//router.post('/billingAddress', userController.setBillingAddress)
router.get(
  "/billingAddress/:user_id",
  authenticate,
  userController.getBillingAddress
);

// router.delete('/delete',UserController.delete)

module.exports = router;
