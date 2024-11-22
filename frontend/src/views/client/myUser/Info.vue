<template>
    <div class="list-book-client">
        <nav class="navbar navbar-expand-lg navbar-light product_navbar">
            <div class="container-fluid">
                <a class="navbar-brand navbar-name" href="#">Navbar</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="#">
                            <router-link to="/">
                                <li :style="textHover">Trang chủ</li>
                            </router-link></a
                        >
                        <a class="nav-link active" aria-current="page" href="#"
                            ><router-link to="/books">
                                Tất cả sách
                            </router-link></a
                        >
                    </div>
                </div>

                <div class="acc" v-if="myUser.MaDocGia">
                    <div class="acc-item text-center" @click="myInfo()">
                        <i class="fa-regular fa-user mr-2"></i>
                    </div>
                    <div class="acc-item text-center" @click="borrowBook()">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                    </div>
                    <div class="acc-item text-center" @click="logout()">
                        <i class="fa-solid fa-right-from-bracket mr-2"></i>
                    </div>
                </div>
                <div v-else class="inner-auth login-acc">
                    <button type="button" class="acc-btn btn btn-primary">
                        <router-link to="/auth/login"> Login </router-link>
                    </button>
                    <button type="button" class="acc-btn btn btn-primary">
                        <router-link to="/auth/register"> Sign up </router-link>
                    </button>
                </div>
            </div>
        </nav>
        <div>
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-8">
                        <h1 class="text-center mb-5">Thông tin cá nhân</h1>
                        <form @submit.prevent="update()">
                            <div class="form-group">
                                <label for="MaDocGia"
                                    >Mã người dùng
                                    <span style="color: red">*</span>
                                </label>
                                <input
                                    readonly
                                    type="text"
                                    class="form-control"
                                    id="MaDocGia"
                                    name="MaDocGia"
                                    @blur="validate()"
                                    v-model="myUser.MaDocGia"
                                    v-bind:class="{
                                        'is-invalid': errors.MaDocGia,
                                    }"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.MaDocGia"
                                >
                                    {{ errors.MaDocGia }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="HoTen"
                                    >Họ và tên <span style="color: red">*</span>
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="HoTen"
                                    name="HoTen"
                                    @blur="validate()"
                                    v-model="myUser.HoTen"
                                    v-bind:class="{
                                        'is-invalid': errors.HoTen,
                                    }"
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
                                    <span style="color: red">*</span>
                                </label>
                                <input
                                    type="DienThoai"
                                    class="form-control"
                                    id="DienThoai"
                                    name="DienThoai"
                                    @blur="validate()"
                                    v-model="myUser.DienThoai"
                                    v-bind:class="{
                                        'is-invalid': errors.DienThoai,
                                    }"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.DienThoai"
                                >
                                    {{ errors.DienThoai }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="DiaChi"
                                    >Địa chỉ <span style="color: red">*</span>
                                </label>
                                <input
                                    type="DiaChi"
                                    class="form-control"
                                    id="DiaChi"
                                    name="DiaChi"
                                    @blur="validate()"
                                    v-model="myUser.DiaChi"
                                    v-bind:class="{
                                        'is-invalid': errors.DiaChi,
                                    }"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.DiaChi"
                                >
                                    {{ errors.DiaChi }}
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="NgaySinh">Năm sinh</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="NgaySinh"
                                    name="NgaySinh"
                                    v-model="myUser.NgaySinh"
                                />
                            </div>
                            <div class="form-group">
                                <label for="Phai">Giới tính</label>
                                <select
                                    v-model="myUser.Phai"
                                    id="Phai"
                                    class="form-control"
                                >
                                    <option value="">Không cung cấp</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">
                                    Cập nhật
                                </button>
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.message"
                                    style="display: block"
                                >
                                    {{ errors.message }}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">Copyright 2024 by VanB2103573</footer>
    </div>
</template>

<style scoped>
button {
    margin-top: 20px;
}
</style>

<script>
export default {
    name: "InfoUser",
    data() {
        return {
            myStyle: {
                backgroundColor: "",
            },
            show: {
                display: "none",
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
            myUser: {
                MaDocGia: "",
                HoTen: "",
                avatar: "",
                NgaySinh: "",
                Phai: "",
                DiaChi: "",
                DienThoai: "",
                password: "",
                charName: "",
                bgc: "",
            },
        };
    },
    created() {
        const tokenUser = this.$cookies.get("tokenUser");
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        if (tokenUser) {
            this.getMyUser(tokenUser);
            this.myStyle.backgroundColor = "#" + randomColor;
        }
    },
    methods: {
        validate() {
            let isValid = true;
            this.errors = {
                MaDocGia: "",
                HoTen: "",
                password: "",
                DienThoai: "",
                DiaChi: "",
                message: "",
            };
            if (!this.myUser.MaDocGia) {
                this.errors.MaDocGia = "User Id is required";
                isValid = false;
                return;
            }
            if (!this.myUser.HoTen) {
                this.errors.HoTen = "Name is required";
                isValid = false;
                return;
            }
            if (!this.myUser.DienThoai) {
                this.errors.DienThoai = "Phone is required";
                isValid = false;
                return;
            } else if (
                this.myUser.DienThoai.length !== 10 &&
                this.myUser.DienThoai.length !== 11
            ) {
                this.errors.DienThoai = "Phone is required length to 10 or 11";
                isValid = false;
                return;
            }

            if (!this.myUser.DiaChi) {
                this.errors.DiaChi = "Address is required";
                isValid = false;
                return;
            }
            return isValid;
        },
        update() {
            if (this.validate()) {
                if (this.myUser.MaDocGia) {
                    this.$request
                        .patch(
                            "http://localhost:5268/api/my-user/update",
                            this.myUser
                        )
                        .then((res) => {
                            console.log("tra ve ne", res.data);
                            
                            this.getMyUser();
                            this.$swal.fire("Saved!", "", "success");
                        })
                        .catch((error) => {
                            this.errors.message = error.response.data.message;
                        });
                }
            }
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
                        this.myUser.avatar = result.info.secure_url;
                    }
                }
            );
            widget.open();
        },
        getMyUser(tokenUser) {
            this.$request
                .get(`http://localhost:5268/api/my-user/${tokenUser}`)
                .then((res) => {
                    if (res.data.success) {
                        // this.myUser.MaDocGia = res.data.user.MaDocGia;
                        // this.myUser.HoTen = res.data.user.HoTen;
                        // this.myUser.avatar = res.data.user.Avatar;
                        // this.myUser.NgaySinh = res.data.user.NgaySinh;
                        // this.myUser.Phai = res.data.user.Phai;
                        // this.myUser.DiaChi = res.data.user.DiaChi;
                        // this.myUser.DienThoai = res.data.user.DienThoai
                        // this.myUser.password = res.data.user.password;


                        this.myUser = res.data.user;
                        const arrName = res.data.user.HoTen.split(" ");
                        const name = arrName[arrName.length - 1];

                        this.myUser.charName = name[0].toUpperCase();
                    }
                });
        },
        showmyUser() {
            if (this.show.display === "none") {
                this.show.display = "block";
            } else {
                this.show.display = "none";
            }
        },
        myInfo() {
            this.$router.push({ name: "user.info" });
        },
        logout() {
            this.$cookies.remove("tokenUser");
            this.$router.push({ name: "user.login" });
        },
        borrowBook() {
            this.$router.push({ name: "books.order" });
        },
    },
};
</script>
