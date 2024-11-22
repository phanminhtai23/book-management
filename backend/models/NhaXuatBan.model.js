const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const publisherSchema = new mongoose.Schema(
  {
    MaNXB: String,
    HoTen: String,
    DiaChi: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    slug: {
      type: String,
      slug: "HoTen",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Publisher = mongoose.model("NhaXuatBan", publisherSchema, "NhaXuatBan");

module.exports = Publisher;
