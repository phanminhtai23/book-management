<template>
    <div class="container menu">
        <div class="row">
            <div class="navbar-main col-2">
                <ul class="nav flex-column">
                    <li class="nav-item user">
                        <a class="nav-link left_bar_item" href="#"
                            ><img
                                src="https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg"
                            />
                            <router-link
                                v-if="typeof myAccount._id !== 'undefined'"
                                :to="{
                                    name: 'admin.accounts.detail',
                                    params: { id: myAccount._id },
                                }"
                            >
                                <button
                                    class="btn btn-acc btn-primary btn-sm mr-2"
                                >
                                    {{ myAccount.MSNV }}
                                </button>
                            </router-link></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#"
                            ><router-link to="/admin/dashboard">
                                <i class="fa-solid fa-chart-pie"></i> Tổng
                                quan</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#"
                            ><router-link to="/admin/books">
                                <i class="fa-solid fa-list-ul"></i>
                                Sản phẩm</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <router-link to="/admin/publishers">
                                <i class="fa-solid fa-bookmark"></i>Nhà xuất
                                bản</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <router-link to="/admin/accounts">
                                <i class="fa-solid fa-users-gear"></i>Tài
                                khoản</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <router-link to="/admin/users"
                                ><i class="fa-solid fa-users"></i>Người
                                dùng</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <router-link to="/admin/orders"
                                ><i class="fa-solid fa-basket-shopping"></i>Mượn
                                sách</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <button
                                class="btn btn-danger btn-sm mr-2 btn-logout"
                                @click="onLogout()"
                            >
                                <i class="fa-solid fa-right-from-bracket"></i>
                                Đăng Xuất
                            </button></a
                        >
                    </li>
                </ul>
            </div>
            <div class="col-10 main">
                <div class="main">
                    <h1 class="mb-4">Thêm mới người dùng</h1>
                    <form @submit.prevent="save()">
                        <div class="form-group">
                            <label for="MaDocGia"
                                >Mã người dùng
                                <span style="color: red">*</span></label
                            >
                            <input
                                v-if="user._id"
                                readonly
                                type="text"
                                class="form-control"
                                id="MaDocGia"
                                name="MaDocGia"
                                @blur="validate()"
                                v-model="user.MaDocGia"
                                v-bind:class="{ 'is-invalid': errors.MaDocGia }"
                            />
                            <input
                                v-else
                                type="text"
                                class="form-control"
                                id="MaDocGia"
                                name="MaDocGia"
                                @blur="validate()"
                                v-model="user.MaDocGia"
                                v-bind:class="{ 'is-invalid': errors.MaDocGia }"
                            />
                            <div class="invalid-feedback" v-if="errors.MaDocGia">
                                {{ errors.MaDocGia }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="HoTen"
                                >Họ và tên
                                <span style="color: red">*</span></label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="HoTen"
                                name="HoTen"
                                v-model="user.HoTen"
                                @blur="validate()"
                                v-bind:class="{ 'is-invalid': errors.HoTen }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="errors.HoTen"
                            >
                                {{ errors.HoTen }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DienThoai"
                                >Số điện thoại
                                <span style="color: red">*</span></label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="DienThoai"
                                name="DienThoai"
                                v-model="user.DienThoai"
                                @blur="validate()"
                                v-bind:class="{ 'is-invalid': errors.DienThoai }"
                            />
                            <div class="invalid-feedback" v-if="errors.DienThoai">
                                {{ errors.DienThoai }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DiaChi"
                                >Địa chỉ
                                <span style="color: red">*</span></label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="DiaChi"
                                name="DiaChi"
                                v-model="user.DiaChi"
                                @blur="validate()"
                                v-bind:class="{ 'is-invalid': errors.DiaChi }"
                            />
                            <div class="invalid-feedback" v-if="errors.DiaChi">
                                {{ errors.DiaChi }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="avatar">Hình ảnh</label>
                            <div>
                                <div
                                    class="btn btn-primary pl-5 pr-5 pt-2 pb-2"
                                    @click="openUploadWidget()"
                                >
                                    Tải Ảnh
                                </div>
                            </div>
                            <div class="mt-2" v-if="user.avatar">
                                <img
                                    v-bind:src="user.avatar"
                                    v-bind:alt="user.HoTen"
                                    width="150px"
                                    style="object-fit: contain"
                                />
                            </div>
                            <input
                                type="text"
                                class="form-control d-none"
                                id="avatar"
                                name="avatar"
                                v-model="user.avatar"
                            />
                        </div>
                        <div class="form-group">
                            <label for="NgaySinh">Năm sinh</label>
                            <input
                                type="number"
                                class="form-control"
                                id="NgaySinh"
                                name="NgaySinh"
                                v-model="user.NgaySinh"
                            />
                        </div>
                        <div class="form-group">
                            <label for="Phai">Giới tính</label>
                            <select
                                v-model="user.Phai"
                                id="Phai"
                                class="form-control"
                            >
                                <option value="">Không cung cấp</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="password"
                                >Mật khẩu
                                <span style="color: red">*</span></label
                            >
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                name="password"
                                v-model="user.password"
                                @blur="validate()"
                                v-bind:class="{ 'is-invalid': errors.password }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="errors.password"
                            >
                                {{ errors.password }}
                            </div>
                        </div>
                        <div class="form-group">
                            <input
                                type="radio"
                                id="active"
                                value="active"
                                v-model="user.status"
                            />
                            <label for="active" class="mr-4 ml-2"
                                >Hoạt động</label
                            >
                            <input
                                type="radio"
                                id="inactive"
                                value="inactive"
                                v-model="user.status"
                                selected="true"
                            />
                            <label for="inactive" class="ml-2"
                                >Dừng hoạt động</label
                            >
                            <div
                                class="invalid-feedback"
                                v-if="errors.message"
                                style="display: block"
                            >
                                {{ errors.message }}
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">
                                Save
                            </button>
                            &nbsp;
                            <button
                                type="reset"
                                class="btn btn-danger"
                                @click="onCancel()"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateUser",
    data() {
        return {
            myAccount: {
                accountId: "",
            },
            errors: {
                MaDocGia: "",
                HoTen: "",
                avatar: "",
                NgaySinh: "",
                Phai: "",
                DiaChi: "",
                DienThoai: "",
                password: "",
                status: "",
                message: "",
            },
            user: {
                MaDocGia: "",
                HoTen: "",
                avatar: "",
                NgaySinh: "",
                Phai: "",
                DiaChi: "",
                DienThoai: "",
                password: "",
                status: "active",
            },
        };
    },
    created() {
        const tokenAdmin = this.$cookies.get("tokenAdmin");
        if (!tokenAdmin) {
            this.$router.push({ name: "admin.login" });
        }
        this.getMyAccount(tokenAdmin);
        if (this.$route.params.id) {
            this.getDetail(this.$route.params.id);
        }
    },
    methods: {
        validate() {
            let isValid = true;
            this.errors = {
                MaDocGia: "",
                HoTen: "",
                avatar: "",
                NgaySinh: "",
                Phai: "",
                DiaChi: "",
                DienThoai: "",
                password: "",
                status: "",
            };
            if (!this.user.MaDocGia) {
                this.errors.MaDocGia = "User Id is required";
                isValid = false;
                return;
            }
            if (!this.user.HoTen) {
                this.errors.HoTen = "Name is required";
                isValid = false;
                return;
            }
            if (!this.user.DienThoai) {
                this.errors.DienThoai = "Phone is required";
                isValid = false;
                return;
            } else if (
                this.user.DienThoai.length === 10 ||
                this.user.DienThoai.length === 11
            ) {
            } else {
                this.errors.DienThoai = "Phone Length is 10 or 11";
                isValid = false;
                return;
            }
            if (!this.user.DiaChi) {
                this.errors.DiaChi = "Address is required";
                isValid = false;
                return;
            }

            if (!this.user.password) {
                this.errors.password = "Password is required";
                isValid = false;
                return;
            }

            return isValid;
        },
        save() {
            console.log(this.user);
            if (this.validate()) {
                if (this.user._id) {
                    this.$request
                        .patch(
                            `http://localhost:5268/api/admin/users/edit/${this.user._id}`,
                            this.user
                        )
                        .then((res) => {
                            if (res.data.success) {
                                this.$router.push({ name: "admin.users" });
                            }
                        });
                    return;
                }
                this.$request
                    .post(
                        "http://localhost:5268/api/admin/users/create",
                        this.user
                    )
                    .then((res) => {
                        if (res.data.success) {
                            this.$router.push({ name: "admin.users" });
                        } else {
                            this.errors.message = res.data.message;
                        }
                    });
            }
        },
        onCancel() {
            this.user.MaDocGia = "";
            this.user.HoTen = "";
            this.user.avatar = "";
            this.user.NgaySinh = "";
            this.user.Phai = "";
            this.user.DiaChi = "";
            this.user.DienThoai = "";
            this.user.password = "";
        },
        getDetail(idUser) {
            this.$request
                .get(`http://localhost:5268/api/admin/users/detail/${idUser}`)
                .then((res) => {
                    if (res.data.success) {
                        this.user = res.data.user;
                    }
                });
        },
        async openUploadWidget() {
            const widget = await window.cloudinary.createUploadWidget(
                {
                    cloud_name: "dkjetw7in",
                    upload_preset: "upload-image-book",
                },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        this.errors.avatar = "";
                        this.user.avatar = result.info.secure_url;
                    }
                }
            );
            widget.open();
        },
        getMyAccount(token) {
            let tokenMyAcc = {
                tokenAdmin: token,
            };
            this.$request
                .post("http://localhost:5268/api/admin/my-account", tokenMyAcc)
                .then((res) => {
                    if (res.data.success) {
                        this.myAccount = res.data.account;
                    }
                });
        },
        onLogout() {
            this.$cookies.remove("tokenAdmin");
            this.$router.push({ name: "admin.login" });
        },
    },
};
</script>
