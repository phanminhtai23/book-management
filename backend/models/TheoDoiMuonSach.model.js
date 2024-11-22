const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    MaDocGia: String,
    MaSach: String,
    SoLuong: Number,
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

const Order = mongoose.model("TheoDoiMuonSach", orderSchema, "TheoDoiMuonSach");

module.exports = Order;
