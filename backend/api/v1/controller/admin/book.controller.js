// const Book = require("../../../../models/book.model");
const Sach = require("../../../../models/Sach.model");

module.exports.index = async (req, res) => {
  try {
    const books = await Sach.find({
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
      _id: req.params.idBook,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Mã sách không tồn tại",
      });
      return;
    }
    res.json({
      success: true,
      book: existBook,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi xem chi tiết sách",
    });
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    const existBook = await Sach.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Book Id không tồn tại",
      });
      return;
    }
    await Sach.updateOne(
      {
        _id: req.params.idBook,
        deleted: false,
      },
      {
        status: req.params.status === "active" ? "inactive" : "active",
      }
    );
    res.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi đổi trạng thái sách",
    });
  }
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const existBook = await Sach.findOne({
      MaSach: req.body.MaSach,
      deleted: false,
    });
    if (existBook) {
      res.json({
        success: false,
        message: "Book Id đã tồn tại",
      });
      return;
    }
    if (req.body.SoQuyen) {
      req.body.SoQuyen = parseInt(req.body.SoQuyen);
    }
    if (req.body.NamXB) {
      req.body.NamXB = parseInt(req.body.NamXB);
    }
    const book = new Sach(req.body);
    await book.save();

    res.json({
      success: true,
      message: "Tạo sách mới thành công!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tạo mới sách",
    });
  }
};

module.exports.edit = async (req, res) => {
  try {
    const existBook = await Sach.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Mã sách không tồn tại",
      });
      return;
    }
    if (req.body.SoQuyen) {
      req.body.SoQuyen = parseInt(req.body.SoQuyen);
    }
    if (req.body.NamXB) {
      req.body.NamXB = parseInt(req.body.NamXB);
    }
    await Sach.updateOne(
      {
        _id: req.params.idBook,
        deleted: false,
      },
      req.body
    );

    const bookNew = await Sach.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    res.json({
      success: true,
      message: "Cập nhật thành công",
      book: bookNew,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi chỉnh sửa sách",
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const existBook = await Sach.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Mã sách không tồn tại",
      });
      return;
    }
    await Sach.updateOne(
      { _id: req.params.idBook, deleted: false },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      success: true,
      message: "Xóa sách thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi xóa sách",
    });
  }
};
