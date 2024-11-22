// const User = require("../../../../models/user.model");
const DocGia = require("../../../../models/DocGia.model");

module.exports.myUser = async (req, res) => {
  try {
    const existUser = await DocGia.findOne({
      tokenUser: req.params.tokenUser,
      status: "active",
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: false,
        message: "Token User không hợp lệ",
      });
      return;
    }
    res.json({
      success: true,
      user: existUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy thông tin User",
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    console.log("fontend gui", req.body.MaDocGia);
    const existUser = await DocGia.findOne({
      MaDocGia: req.body.MaDocGia,
      status: "active",
      deleted: false,
    });

    if (!existUser) {
      res.json({
        success: false,
        message: "Mã người dùng không hợp lệ",
      });
      return;
    }
    if (req.body.NgaySinh !== null) {
      req.body.NgaySinh = parseInt(req.body.NgaySinh);
    }
    await DocGia.updateOne(
      {
        MaDocGia: req.body.MaDocGia,
        deleted: false,
      },
      req.body
    );
    const userNew = await DocGia.findOne({
      MaDocGia: req.body.MaDocGia,
      deleted: false,
    });
    res.json({
      success: true,
      message: "Cập nhật tài khoản thành công",
      user: userNew,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi cập nhật tài khoản người dùng",
    });
  }
};
