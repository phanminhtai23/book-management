// const User = require("../../../../models/user.model");
const DocGia = require("../../../../models/DocGia.model");
// const Book = require("../../../../models/book.model");
const Sach = require("../../../../models/Sach.model");

const TheoDoiMuonSach = require("../../../../models/TheoDoiMuonSach.model");

module.exports.getAll = async (req, res) => {
  try {
    const theoDoiMuonSachs = await TheoDoiMuonSach.find({
      MaDocGia: req.params.userId,
      deleted: false,
    });
    
    const fullOrder = [];
    for (const theoDoiMuonSach of theoDoiMuonSachs) {

      const docGia = await DocGia.findOne({
        MaDocGia: theoDoiMuonSach.MaDocGia,
        status: "active",
        deleted: false,
      }).select("MaDocGia HoTen");

      const sach = await Sach.findOne({
        MaSach: theoDoiMuonSach.MaSach,
        deleted: false,
      }).select("MaSach thumbnail TenSach SoQuyen");

      fullOrder.push({
        theoDoiMuonSach: theoDoiMuonSach,
        docGia: docGia,
        sach: sach,
      });
      // console.log("object", fullOrder);
    }
    
    res.json({
      success: true,
      orders: fullOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách mượn sách",
    });
  }
};

module.exports.order = async (req, res) => {
  try {
    const existUser = await DocGia.findOne({
      MaDocGia: req.body.MaDocGia,
      status: "active",
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: 404,
        message: "User Id không tồn tại1",
      });
      return;
    }
    const existBook = await Sach.findOne({
      MaSach: req.body.MaSach,
      status: "active",
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: 404,
        message: "Book Id không tồn tại",
      });
      return;
    }
    req.body.SoLuong = parseInt(req.body.SoLuong);
    const existOrder = await TheoDoiMuonSach.findOne({
      MaDocGia: existUser.MaDocGia,
      MaSach: existBook.MaSach,
      deleted: false,
    });
    
    // Nếu đặt lần đầu => tạo và cập nhật lại số lượng sách
    if (!existOrder) {
      const order = new TheoDoiMuonSach(req.body);
      await order.save();
      const stockCurrent = existBook.SoQuyen - order.SoLuong;
      if (stockCurrent >= 0) {
        await Sach.updateOne(
          {
            MaSach: req.body.MaSach,
            status: "active",
            deleted: false,
          },
          {
            stock: stockCurrent,
          }
        );
      }
      res.json({
        success: true,
        order: order,
      });
      return;
    }
    // Cập nhật TheoDoiMuonSach
    // console.log("existOrder", existOrder);
    await TheoDoiMuonSach.updateOne(
      {
        MaDocGia: existUser.MaDocGia,
        MaSach: existBook.MaSach,
        deleted: false,
      },
      {
        SoLuong: existOrder.SoLuong + req.body.SoLuong,
      }
    );
    // Cập nhật lại số sách
    const orderNew = await TheoDoiMuonSach.findOne({
      MaDocGia: existUser.MaDocGia,
      MaSach: existBook.MaSach,
      deleted: false,
    });
    console.log(orderNew.SoLuong);
    console.log(existBook.SoQuyen);
    const stockCurrent = existBook.SoQuyen - req.body.SoLuong;
    console.log(stockCurrent);
    if (stockCurrent >= 0) {
      await Sach.updateOne(
        {
          MaSach: req.body.MaSach,
          status: "active",
          deleted: false,
        },
        {
          SoQuyen: stockCurrent,
        }
      );
    } else {
      res.json({
        success: false,
        message: "Sản phẩm này đã hết hàng",
      });
      return;
    }
    res.json({
      success: true,
      order: orderNew,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tạo order sách",
    });
  }
};

module.exports.give = async (req, res) => {
  try {
    const docGia = await DocGia.findOne({
      MaDocGia: req.body.MaDocGia,
      status: "active",
      deleted: false,
    });
    const sach = await Sach.findOne({
      MaSach: req.body.MaSach,
      status: "active",
      deleted: false,
    });
    if (!docGia) {
      res.json({
        success: false,
        message: "docGia không tồn tại",
      });
      return;
    }
    if (!sach) {
      res.json({
        success: false,
        message: "Book Id không tồn tại",
      });
      return;
    }
    req.body.giveQuantity = parseInt(req.body.giveQuantity);
    const theoDoiMuonSach = await TheoDoiMuonSach.findOne({
      MaDocGia: req.body.MaDocGia,
      bookId: req.body.bookId,
      deleted: false,
    });
    if (!theoDoiMuonSach) {
      res.json({
        success: false,
        message: "Order sách không tồn tại",
      });
      return;
    }
    console.log(order.quantity);
    console.log(req.body.giveQuantity);
    if (req.body.giveQuantity === order.quantity) {
      await Order.updateOne(
        {
          userId: req.body.userId,
          bookId: req.body.bookId,
          deleted: false,
        },
        { quantity: 0, deleted: false, deletedAt: new Date() }
      );
    } else {
      await Order.updateOne(
        {
          userId: req.body.userId,
          bookId: req.body.bookId,
          deleted: false,
        },
        { quantity: order.quantity - req.body.giveQuantity }
      );
    }
    await Book.updateOne(
      {
        bookId: req.body.bookId,
        deleted: false,
      },
      {
        stock: book.stock + req.body.giveQuantity,
        status: "active",
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi cập nhật số lượng order va book",
    });
  }
};
