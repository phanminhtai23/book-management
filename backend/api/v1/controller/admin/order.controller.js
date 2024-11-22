const TheoDoiMuonSach = require("../../../../models/TheoDoiMuonSach.model");
const DocGia = require("../../../../models/DocGia.model");
const Sach = require("../../../../models/Sach.model");


module.exports.index = async (req, res) => {
  try {
    const orders = await TheoDoiMuonSach.find({
      deleted: false,
    }).sort({ createdAt: "desc" });
    const listOrder = [];
    for (const order of orders) {
      const user = await DocGia.findOne({
        MaDocGia: order.MaDocGia,
        deleted: false,
      });
      const book = await Sach.findOne({
        MaSach: order.MaSach,
        deleted: false,
      });
      if (!user) {
        res.json({
          success: false,
          message: "User Id không hợp lệ",
        });
        return;
      }
      if (!book) {
        res.json({
          success: false,
          message: "Book Id không tồn tại",
        });
        return;
      }
      listOrder.push({
        order: order,
        user: user,
        book: book,
      });
    }
    res.json({
      success: true,
      orders: listOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách mượn sách",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const existOrder = await TheoDoiMuonSach.findOne({
      _id: req.params.idOrder,
      deleted: false,
    });
    if (!existOrder) {
      res.json({
        success: false,
        message: "Order Id không tồn tại",
      });
      return;
    }
    const user = await DocGia.findOne({
      MaDocGia: existOrder.MaDocGia,
      status: "active",
      deleted: false,
    });
    const book = await Sach.findOne({
      MaSach: existOrder.MaSach,
      deleted: false,
    });
    res.json({
      success: true,
      order: {
        order: existOrder,
        user: user,
        book: book,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lấy chi tiết sách mượn thất bại",
    });
  }
};
