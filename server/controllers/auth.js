const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { handle, email, password, category } = req.body;
  try {
    const defaultLink = {
      url: "typefinance.com",
      title: "Default link",
      icon: "",
    };
    const newUser = await User.create({
      handle,
      email,
      password,
      role: category,
      links: [defaultLink],
    });
    const token = jwt.sign({ email: email }, process.env.KEY_TOKEN);
    res.json({
      status: 200,
      message: "Đăng ký thành công!",
      token: token,
      id: newUser._id,
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
      password: password,
    });
    if (!user) {
      return res.json({
        status: "error",
        error: "Sai tài khoản hoặc mật khẩu!",
      });
    }
    const token = jwt.sign({ email: email},process.env.KEY_TOKEN);
    return res.json({
        status: 200,
        message: "Đăng nhập thành công!",
        token: token,
        id: user._id
    })
  } catch (error) {
    return res.json({
        status: "error",
        message: error,
      });
  }
};

module.exports = { register, login };
