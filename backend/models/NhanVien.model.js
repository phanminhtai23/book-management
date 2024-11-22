const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    MSNV: String,
    HoTenNV: String,
    ChucVu: String,
    DiaChi: String,
    SoDienThoai: String,
    password: String,
    status: String,
    tokenAdmin: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("NhanVien", accountSchema, "NhanVien");

module.exports = Account;
