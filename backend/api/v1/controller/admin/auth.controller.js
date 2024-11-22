const md5 = require("md5");

// const Account = require("../../../../models/account.model");
const NhanVien = require("../../../../models/NhanVien.model");


// module.exports.login = async (req, res) => {
//     try {
//         const existAccount = await Account.findOne({
//             accountId: req.body.accountId,
//             status: "active",
//             deleted: false,
//         });

//         if (!existAccount) {
//             res.json({
//                 success: false,
//                 message: "Mã nhân viên không tồn tại",
//             });
//             return;
//         }

//         if (existAccount.password !== md5(req.body.password)) {
//             console.log((md5(req.body.password)));
//             res.json({
//                 success: false,
//                 message: "Mật khẩu không chính xác",
//             });
//             return;
//         }
//         res.json({
//             success: true,
//             message: "Đăng nhập thành công",
//             tokenAdmin: existAccount.tokenAdmin,
//         });
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success: false,
//             message: "Lỗi đăng nhập tài khoản admin",
//         });
//     }
// };


module.exports.login = async (req, res) => {
    try {
        const existAccount = await NhanVien.findOne({
            MSNV: req.body.accountId,
            status: "active",
            deleted: false,
        });

        if (!existAccount) {
            res.json({
                success: false,
                message: "Mã nhân viên không tồn tại",
            });
            return;
        }

        if (existAccount.password !== md5(req.body.password)) {
            console.log((md5(req.body.password)));
            res.json({
                success: false,
                message: "Mật khẩu không chính xác",
            });
            return;
        }
        res.json({
            success: true,
            message: "Đăng nhập thành công",
            tokenAdmin: existAccount.tokenAdmin,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Lỗi đăng nhập tài khoản admin",
        });
    }
};