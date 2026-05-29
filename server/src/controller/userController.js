import { generateJwt, authenticateJWT } from "../middleware/auth.js";
import User from "../models/userSchema.js";
import { sendMail } from "../utils/nodemailer.js";
import bcrypt  from 'bcrypt'

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Some field are missing",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User Already exists",
    });
  }

  const newUser = new User({
    name,
    email,
    password,
  });
  await newUser.save();

  const token = generateJwt(newUser);
  console.log("generated token", token)
res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
});
  res.status(200).json({
    message: "User registerd sucessfully",
    success: true,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Some field are missing",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }
  const token = generateJwt(user);
res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
});
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: user,
  });
};

const LogOut = async (req, res) => {
 return res.cookie("token","",{maxAge:0}).json({
        message: "Successfully logged out",
        success: true,
      })
}

const getInfo = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User information",
    user: user,
  });
};

const updatePassword = async (req, res) => {
  const { oldpassword, newpassword } = req.body;
  console.log(req.body)
  console.log("odlpassword", oldpassword, newpassword)
  if (!oldpassword || !newpassword) {
    return res.status(400).json({
      success: false,
      message: "Password is missing",
    });
  }

  const user = await User.findOne({ email: req.user.email });

  const isPasswordCorrect = await user.comparePassword(oldpassword);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Old password is not correct",
      success: false,
    });
  }
  user.password = newpassword;
  await user.save();
  return res.status(200).json({
    message: "Password is updated successfully",
    success: true,
  });
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  const token = String(Math.floor(Math.random() * 9000) + 1000);
  user.token = token;
  await user.save();
  await sendMail(email, "Password Reset", `${process.env.FRONTEND_URL}/reset/${token}`)

  res.status(200).json({
    success: true,
    message: "Password reset link sent to your email",
    token: token,
  });
  console.log(token);
};

const resetPassword = async (req, res) => {
  const token = req.params.token;
  console.log("token",token)
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
  const newPassword = await bcrypt.hash(req.body.password, 10);
  user.password = newPassword;
  user.token = null;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
}

export { registerUser, loginUser, getInfo, updatePassword, forgetPassword, LogOut, resetPassword }
