const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const bookSchema = new mongoose.Schema(
  {
    MaSach: String,
    TenSach: String,
    thumbnail: String,
    TacGia: String,
    SoQuyen: Number,
    rate: String,
    MoTa: String,
    MaNXB: String,
    NamXuatBan: Number,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    slug: {
      type: String,
      slug: "TenSach",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Sach", bookSchema, "Sach");

module.exports = Book;
