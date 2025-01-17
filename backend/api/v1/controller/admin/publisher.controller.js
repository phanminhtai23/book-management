// const Publisher = require("../../../../models/publisher.model");
const NhaXuatBan = require("../../../../models/NhaXuatBan.model");
module.exports.index = async (req, res) => {
  try {
    const publishers = await NhaXuatBan.find({
      deleted: false,
    });
    res.json({
      success: true,
      publishers: publishers,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách nhà xuất bản",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const existPublisher = await NhaXuatBan.findOne({
      _id: req.params.idPublisher,
      deleted: false,
    });
    if (!existPublisher) {
      res.json({
        success: false,
        message: "Mã NXB không hợp lệ",
      });
      return;
    }
    res.json({
      success: true,
      publisher: existPublisher,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy chi tiết nhà xuất bản",
    });
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    const existPublisher = await NhaXuatBan.findOne({
      _id: req.params.idPublisher,
      deleted: false,
    });
    if (!existPublisher) {
      res.json({
        success: false,
        message: "Publisher Id không tồn tại",
      });
      return;
    }
    await NhaXuatBan.updateOne(
      {
        _id: req.params.idPublisher,
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
      message: "Lỗi đổi trạng thái NXB",
    });
  }
};

module.exports.create = async (req, res) => {
  try {
    console.log("gui len", req.body);
    const existPublisher = await NhaXuatBan.findOne({
      MaNXB: req.body.MaNXB,
      deleted: false,
    });
    if (existPublisher) {
      res.json({
        success: false,
        message: "Publisher Id đã tồn tại",
      });
      return;
    }

    const publisher = new NhaXuatBan(
      req.body
    );
    await publisher.save();
    res.json({
      success: true,
      message: "Tạo NXB mới thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tạo nhà xuất bản",
    });
  }
};

module.exports.edit = async (req, res) => {
  try {
    const existPublisher = await NhaXuatBan.findOne({
      _id: req.params.idPublisher,
      deleted: false,
    });
    if (!existPublisher) {
      res.json({
        success: false,
        message: "Mã NXB không hợp lệ",
      });
      return;
    }
    await NhaXuatBan.updateOne(
      { _id: req.params.idPublisher, deleted: false },
      req.body
    );
    const publisher = await NhaXuatBan.findOne({
      _id: req.params.idPublisher,
      deleted: false,
    });
    res.json({
      success: true,
      message: "Cập nhật nhà xuất bản thành công",
      publisher: publisher,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi chỉnh sửa nhà xuất bản",
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const existPublisher = await NhaXuatBan.findOne({
      _id: req.params.idPublisher,
      deleted: false,
    });
    if (!existPublisher) {
      res.json({
        success: false,
        message: "Mã nhà xuất bản không hợp lệ",
      });
      return;
    }
    await NhaXuatBan.updateOne(
      { _id: req.params.idPublisher, deleted: false },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      success: true,
      message: "Xóa nhà xuất bản thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi xóa nhà xuất bản",
    });
  }
};
