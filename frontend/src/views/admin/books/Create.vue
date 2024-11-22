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
                    <h1 class="mb-4">Thêm mới sách</h1>
                    <form @submit.prevent="save()">
                        <div class="form-group">
                            <label for="MaSach"
                                >Mã sách
                                <span style="color: red">*</span></label
                            >
                            <input
                                v-if="book._id"
                                readonly
                                type="text"
                                class="form-control"
                                id="MaSach"
                                name="MaSach"
                                @blur="validate()"
                                v-model="book.MaSach"
                                v-bind:class="{ 'is-invalid': errors.MaSach }"
                            />
                            <input
                                v-else
                                type="text"
                                class="form-control"
                                id="MaSach"
                                name="MaSach"
                                @blur="validate()"
                                v-model="book.MaSach"
                                v-bind:class="{ 'is-invalid': errors.MaSach }"
                            />
                            <div class="invalid-feedback" v-if="errors.MaSach">
                                {{ errors.MaSach }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="TenSach"
                                >Tên sách
                                <span style="color: red">*</span></label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="TenSach"
                                name="TenSach"
                                v-model="book.TenSach"
                                @blur="validate()"
                                v-bind:class="{ 'is-invalid': errors.TenSach }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="errors.TenSach"
                            >
                                {{ errors.TenSach }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="TacGia">Tác giả</label>
                            <input
                                type="text"
                                class="form-control"
                                id="TacGia"
                                name="TacGia"
                                v-model="book.TacGia"
                            />
                        </div>
                        <div class="form-group">
                            <label for="SoQuyen">Số lượng</label>
                            <input
                                type="number"
                                class="form-control"
                                id="SoQuyen"
                                name="SoQuyen"
                                v-model="book.SoQuyen"
                            />
                        </div>
                        <div class="form-group">
                            <label for="thumbnail"
                                >Hình ảnh
                                <span style="color: red">*</span></label
                            >
                            <div>
                                <div
                                    class="btn btn-primary pl-5 pr-5 pt-2 pb-2"
                                    @click="openUploadWidget()"
                                >
                                    Tải Ảnh
                                </div>
                            </div>
                            <div class="mt-2" v-if="book.thumbnail">
                                <img
                                    v-bind:src="book.thumbnail"
                                    v-bind:alt="book.TenSach"
                                    width="150px"
                                    style="object-fit: contain"
                                />
                            </div>
                            <input
                                type="text"
                                class="form-control d-none"
                                id="thumbnail"
                                name="thumbnail"
                                @blur="validate()"
                                v-model="book.thumbnail"
                                v-bind:class="{
                                    'is-invalid': errors.thumbnail,
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="errors.thumbnail"
                            >
                                {{ errors.thumbnail }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="MaNXB">Mã nhà xuất bản</label>
                            <select
                                v-model="book.MaNXB"
                                id="MaNXB"
                                class="form-control"
                            >
                                <option disabled value="">
                                    Không thuộc NXB
                                </option>
                                <option
                                    v-for="publisher in publishers"
                                    v-bind:value="publisher.MaNXB"
                                >
                                    {{ publisher.HoTen }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="rate">Đánh giá</label>
                            <input
                                type="text"
                                class="form-control"
                                id="rate"
                                name="rate"
                                v-model="book.rate"
                            />
                        </div>
                        <div class="form-group">
                            <label for="NamXuatBan">Năm xuất bản</label>
                            <input
                                type="number"
                                class="form-control"
                                id="NamXuatBan"
                                name="NamXuatBan"
                                v-model="book.NamXuatBan"
                            />
                        </div>

                        <div class="form-group">
                            <label for="MoTa">Mô tả</label>
                            <textarea
                                class="form-control"
                                rows="5"
                                id="MoTa"
                                name="MoTa"
                                v-model="book.MoTa"
                            ></textarea>
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-primary mt-2">
                                Save
                            </button>
                            &nbsp;
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateBook",
    data() {
        return {
            myAccount: {
                accountId: "",
            },
            errors: {
                MaSach: "",
                TenSach: "",
                thumbnail: "",
                TacGia: "",
                SoQuyen: "",
                rate: "",
                MoTa: "",
                MaNXB: "",
                NamXuatBan: "",
                status: "",
                message: "",
            },
            book: {
                MaSach: "",
                TenSach: "",
                thumbnail: "",
                TacGia: "",
                SoQuyen: "",
                rate: "",
                MoTa: "",
                MaNXB: "",
                NamXuatBan: "",
                status: "active",
            },
            publishers: [],
        };
    },
    created() {
        const tokenAdmin = this.$cookies.get("tokenAdmin");
        if (!tokenAdmin) {
            this.$router.push({ name: "admin.login" });
        }
        this.getMyAccount(tokenAdmin);
        this.getAllPublisher();
        if (this.$route.params.id) {
            this.getDetail(this.$route.params.id);
        }
    },
    methods: {
        validate() {
            let isValid = true;
            this.errors = {
                MaSach: "",
                TenSach: "",
                thumbnail: "",
                TacGia: "",
                SoQuyen: "",
                rate: "",
                MoTa: "",
                MaNXB: "",
                NamXuatBan: "",
                status: "",
            };
            if (!this.book.MaSach) {
                this.errors.MaSach = "Book Id is required";
                isValid = false;
                return;
            }
            if (!this.book.TenSach) {
                this.errors.TenSach = "Name is required";
                isValid = false;
                return;
            }
            if (!this.book.thumbnail) {
                this.errors.thumbnail = "Thumbnail Id is required";
                isValid = false;
                return;
            }

            return isValid;
        },
        save() {
            if (this.validate()) {
                if (this.book._id) {
                    this.$request
                        .patch(
                            `http://localhost:5268/api/admin/books/edit/${this.book._id}`,
                            this.book
                        )
                        .then((res) => {
                            console.log(res);
                            if (res.data.success) {
                                this.$router.push({ name: "admin.books" });
                            }
                        });
                    return;
                }
                this.$request
                    .post(
                        "http://localhost:5268/api/admin/books/create",
                        this.book
                    )
                    .then((res) => {
                        if (res.data.success) {
                            console.log(this.book);
                            this.$router.push({ name: "admin.books" });
                        } else {
                            this.errors.message = res.data.message;
                        }
                    });
            }
        },
        onCancel() {
            this.account.MaSach = "";
            this.account.TenSach = "";
            this.account.thumbnail = "";
            this.account.TacGia = "";
            this.account.SoQuyen = "";
            this.account.MoTa = "";
            this.account.MaNXB = "";
            this.account.NamXuatBan = "";
        },
        getDetail(idBook) {
            this.$request
                .get(`http://localhost:5268/api/admin/books/detail/${idBook}`)
                .then((res) => {
                    if (res.data.success) {
                        this.book = res.data.book;
                    }
                });
        },
        getAllPublisher() {
            this.$request
                .get(`http://localhost:5268/api/admin/publishers/`)
                .then((res) => {
                    if (res.data.success) {
                        this.publishers = res.data.publishers;
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
                        this.errors.thumbnail = "";
                        this.book.thumbnail = result.info.secure_url;
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
