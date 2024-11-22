// const Book = require("../../../../models/book.model");
const Sach = require("../../../../models/Sach.model");
// const Publisher = require("../../../../models/publisher.model");
const NhaXuatBan = require("../../../../models/NhaXuatBan.model");

module.exports.index = async (req, res) => {
  try {
    const books = await Sach.find({
      status: "active",
      deleted: false,
    });
    res.json({
      success: true,
      books: books,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách sách",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const existBook = await Sach.findOne({
      slug: req.params.slugBook,
      status: "active",
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: 404,
        message: "Sách bạn cần không tồn tại",
      });
      return;
    }
      // console.log("???", existBook.MaNXB);
    const NhaXuatBan1 = await NhaXuatBan.findOne({
      MaNXB: existBook.MaNXB,
      deleted: false,
    });
    res.json({
      success: true,
      book: existBook,
      NhaXuatBan: NhaXuatBan1,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy chi tiết sách",
    });
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    const existBook = await Sach.findOne({
      slug: req.params.slugBook,
      status: "active",
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Book không tồn tại",
      });
      return;
    }
    await Sach.updateOne(
      {
        slug: req.params.slugBook,
        status: "active",
        deleted: false,
      },
      { status: "inactive" }
    );
    res.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi cập nhật trạng thái sách",
    });
  }
};
