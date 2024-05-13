import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { emailVerificationMailgenContent, sendMail } from "../utils/mail.js";

//generate access and refresh tokens for the user
// this fucntion will take the userId as an argument and will return the access and refresh tokens
const generateTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("No user found");
  }

  // generate access token
  const accessToken = user.generateAccessToken();
  // generate refresh token
  const refreshToken = user.generateRefreshToken();

  // save the refresh token to the database
  user.refreshToken = refreshToken;
  // save the user and also disable the validation
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// =========================================register the user========================================================
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // check if the user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  // create a new user
  const user = new User({ username, email, password, isEmailVerified: false });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  // save the user to the database
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  // send email verification mail
  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/verify-email/${unHashedToken}`;

  // mailgen content
  await sendMail({
    email: user?.email,
    subject: "Email Verification",
    mailgenContent: emailVerificationMailgenContent(
      user?.username,
      verificationUrl
    ),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json({ success: false, message: "User not created" });
  }

  res.status(201).json({
    success: true,
    message:
      "User created successfully and verification email has been sent to your email",
  });
};

// =========================================login the user========================================================
const loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username && !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email or username" });
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options) // set the access token in the cookie
    .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
    .json({ success: true, message: "User logged in successfully" });
};

const socialLogin = async (req, res) => {
  const { email, username, avatar } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
    // if the user does not exist then create a new user and then return the access and refresh tokens
    if (!user || user === null) {
      const newUser = await User.create({
        username,
        email,
        avatar,
        isEmailVerified: true,
      });
      const { accessToken, refreshToken } = await generateTokens(newUser._id);
      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };
      return res
        .status(201)
        .cookie("accessToken", accessToken, options) // set the access token in the cookie
        .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
        .json({ success: true, message: "User created successfully" });
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options) // set the access token in the cookie
      .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// =========================================logout the user========================================================
const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ success: true, message: "User logged out successfully" });
};

// =========================================verify the email of the user========================================================
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid token" });
  }
  // generate a hash from the token that we are receiving
  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  // Tun the email verified flag to `true`
  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    isEmailVerified: true,
    message: "Email verified successfully",
  });
};

// =========================================resend the verification email========================================================
const resendVerificationEmail = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (user.isEmailVerified) {
    return res
      .status(400)
      .json({ success: false, message: "Email already verified" });
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/verify-email/${unHashedToken}`;

  await sendMail({
    email: user?.email,
    subject: "Email Verification",
    mailgenContent: emailVerificationMailgenContent(
      user?.username,
      verificationUrl
    ),
  });

  return res.status(200).json({
    success: true,
    message: "Verification email sent successfully",
  });
};

// =========================================refresh the access token========================================================
const refreshToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token is required" });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({ success: true, message: "Token refreshed successfully" });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// =========================================reset the password of the user========================================================
const forgotPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate a temporary token
    const { unHashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken(); // generate password reset creds

    // save the hashed version a of the token and expiry in the DB
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });

    // send the password reset email
    const passwordResetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/reset-password/${unHashedToken}`;

    await sendMail({
      email: user?.email,
      subject: "Password Reset",
      mailgenContent: forgotPasswordMailgenContent(
        user?.username,
        passwordResetUrl
      ),
    });

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =========================================reset the password of the user========================================================
const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  if (!resetToken) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }

  // Create a hash of the incoming reset token

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // See if user with hash similar to resetToken exists
  // If yes then check if token expiry is greater than current date

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }

  // if everything is ok and token id valid
  // reset the forgot password token and expiry
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  // set the new password
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};

// =========================================change the current password of the user========================================================
const changeCurrentPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    user.password = newPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// exporting all the functions

export {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendVerificationEmail,
  refreshToken,
  forgotPasswordReset,
  resetPassword,
  changeCurrentPassword,
  socialLogin,
  getUserInfo,
};
