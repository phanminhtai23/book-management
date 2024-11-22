const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    MaDocGia: String,
    HoTen: String,
    avatar: String,
    NgaySinh: Number,
    Phai: String,
    DiaChi: String,
    DienThoai: String,
    status: String,
    password: String,
    tokenUser: String,
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

const User = mongoose.model("DocGia", userSchema, "DocGia");

module.exports = User;
