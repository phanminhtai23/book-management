const md5 = require("md5");

// const User = require("../../../../models/user.model");
const DocGia = require("../../../../models/DocGia.model");
const generate = require("../../../../helpers/generate");

module.exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const existUser = await DocGia.findOne({
      MaDocGia: req.body.userId,
      status: "active",
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: false,
        message: "Mã người dùng không tồn tại",
      });
      return;
    }

    if (existUser.password !== md5(req.body.password)) {
      res.json({
        success: false,
        message: "Mật khẩu không chính xác",
      });
      return;
    }
    res.json({
      success: true,
      message: "Đăng nhập thành công",
      tokenUser: existUser.tokenUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi đăng nhập tài khoản người dùng",
    });
  }
};

module.exports.register = async (req, res) => {
  try {
    const existUser = await DocGia.findOne({
      MaDocGia: req.body.userId,
      status: "active",
      deleted: false,
    });
    if (existUser) {
      res.json({
        success: false,
        message: "Mã người dùng đã tồn tại",
      });
      return;
    }
    const tokenUser = generate.generateRandomString(16);
    req.body.tokenUser = tokenUser;
    req.body.password = md5(req.body.password);
    req.body.status = "active";
    req.body.avatar = "";
    req.body.Phai = "";
    if (req.body.birthYear) {
      req.body.birthYear = parseInt(req.body.birthYear);
    } else {
      req.body.birthYear = "";
    }

    const user = new DocGia({
      MaDocGia: req.body.userId,
      HoTen: req.body.fullName,
      DiaChi: req.body.address,
      SDT: req.body.phone,
      Email: req.body.email,
      password: req.body.password,
      tokenUser: req.body.tokenUser,
      status: req.body.status,
      avatar: req.body.avatar,
      Phai: req.body.Phai,
      birthYear: req.body.birthYear,
    });
    await user.save();
    res.json({
      success: true,
      tokenUser: user.tokenUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tạo tài khoản người dùng",
    });
  }
};
