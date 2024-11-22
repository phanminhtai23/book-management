
const NhanVien = require("../../../../models/NhanVien.model");

module.exports.get = async (req, res) => {
  try {
    const existAccount = await NhanVien.findOne({
      tokenAdmin: req.body.tokenAdmin,
      deleted: false,
    });
    if (!existAccount) {
      res.json({
        success: false,
        message: "Token Admin không tồn tại",
      });
      return;
    }
    res.json({
      success: true,
      account: existAccount,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lấy tài khoản admin bằng token admin",
    });
  }
};
