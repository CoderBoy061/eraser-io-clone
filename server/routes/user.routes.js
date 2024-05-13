import { Router } from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgottenPasswordValidator } from '../validators/userValidators.js';
import { changeCurrentPassword, forgotPasswordReset, getUserInfo, loginUser, logoutUser, refreshToken, registerUser, resendVerificationEmail, resetPassword, socialLogin, verifyEmail } from '../controllers/userController.js';

const router = Router();

//unprotected routes
router.route("/register").post(userRegisterValidator(), registerUser)
router.route("/login").post(userLoginValidator(), loginUser)
router.route("/refresh-token").post(refreshToken)
router.route("/verify-email/:verificationToken").get(verifyEmail)
router.route("/forgot-password").post(userForgotPasswordValidator(), forgotPasswordReset)
router.route("/reset-password/:resetToken").post(userResetForgottenPasswordValidator(), resetPassword)
router.route("/google-login").post(socialLogin);
router.route("/get/info").get(isAuth,getUserInfo);

//protected routes
router.route("/logout").post(isAuth, logoutUser);
router
    .route("/change-password")
    .post(
        isAuth,
        userChangeCurrentPasswordValidator(),
        changeCurrentPassword
    );

    router
    .route("/resend-email-verification")
    .post(isAuth, resendVerificationEmail);

export default router;

