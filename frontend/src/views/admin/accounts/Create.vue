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
                    <h1 class="mb-4">Chỉnh sửa tài khoản</h1>
                    <form @submit.prevent="save()">
                        <div class="form-group">
                            <label for="MSNV"
                                >Mã nhân viên
                                <span style="color: red">*</span></label
                            >
                            <input
                                v-if="account._id"
                                readonly
                                type="text"
                                class="form-control"
                                id="MSNV"
                                name="MSNV"
                                @blur="validate()"
                                v-model="account.MSNV"
                                v-bind:class="{
                                    'is-invalid': errors.MSNV,
                                }"
                            />
                            <input
                                v-else
                                type="text"
                                class="form-control"
                                id="MSNV"
                                name="MSNV"
                                @blur="validate()"
                                v-model="account.MSNV"
                                v-bind:class="{
                                    'is-invalid': errors.MSNV,
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="errors.MSNV"
                            >
                                {{ errors.MSNV }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="HoTenNV"
                                >Họ và tên
                                <span style="color: red">*</span></label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="HoTenNV"
                                name="HoTenNV"
                                v-model="account.HoTenNV"
                                @blur="validate()"
                                v-bind:class="{ 'is-invalid': errors.HoTenNV }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="errors.HoTenNV"
                            >
                                {{ errors.HoTenNV }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ChucVu"
                                >Chức vụ
                                <span style="color: red">*</span></label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="ChucVu"
                                name="ChucVu"
                                @blur="validate()"
                                v-model="account.ChucVu"
                                v-bind:class="{ 'is-invalid': errors.ChucVu }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="errors.ChucVu"
                            >
                                {{ errors.ChucVu }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DiaChi">Địa chỉ</label>
                            <input
                                type="text"
                                class="form-control"
                                id="DiaChi"
                                name="DiaChi"
                                @blur="validate()"
                                v-model="account.DiaChi"
                                v-bind:class="{ 'is-invalid': errors.DiaChi }"
                            />
                            <div class="invalid-feedback" v-if="errors.DiaChi">
                                {{ errors.DiaChi }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="SoDienThoai">Số điện thoại</label>
                            <input
                                type="text"
                                class="form-control"
                                id="SoDienThoai"
                                name="SoDienThoai"
                                @blur="validate()"
                                v-model="account.SoDienThoai"
                                v-bind:class="{ 'is-invalid': errors.SoDienThoai }"
                            />
                            <div class="invalid-feedback" v-if="errors.SoDienThoai">
                                {{ errors.SoDienThoai }}
                            </div>
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
                                @blur="validate()"
                                v-model="account.password"
                                v-bind:class="{ 'is-invalid': errors.password }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="errors.password"
                            >
                                {{ errors.password }}
                            </div>
                        </div>
                        <div class="form-group mt-2">
                            <button type="submit" class="btn btn-primary">
                                Save
                            </button>
                            &nbsp;
                            <button
                                type="reset"
                                class="btn btn-danger"
                                @click="onCancel()"
                            >
                                Reset
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
    name: "CreateAccountAdmin",
    data() {
        return {
            myAccount: {
                MSNV: "",
            },
            errors: {
                MSNV: "",
                HoTenNV: "",
                ChucVu: "",
                DiaChi: "",
                SoDienThoai: "",
                password: "",
                status: "",
                message: "",
            },
            account: {
                MSNV: "",
                HoTenNV: "",
                ChucVu: "",
                DiaChi: "",
                SoDienThoai: "",
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
                MSNV: "",
                HoTenNV: "",
                ChucVu: "",
                DiaChi: "",
                SoDienThoai: "",
                password: "",
                status: "",
            };
            if (!this.account.MSNV) {
                this.errors.MSNV = "Account Id is required";
                isValid = false;
                return;
            }
            if (!this.account.HoTenNV) {
                this.errors.HoTenNV = "Name is required";
                isValid = false;
                return;
            }
            if (!this.account.ChucVu) {
                this.errors.ChucVu = "Position is required";
                isValid = false;
                return;
            }
            if (!this.account.password) {
                this.errors.password = "Password Id is required";
                isValid = false;
                return;
            }

            return isValid;
        },
        save() {
            if (this.validate()) {
                if (this.account._id) {
                    this.$request
                        .patch(
                            `http://localhost:5268/api/admin/accounts/edit/${this.account._id}`,
                            this.account
                        )
                        .then((res) => {
                            console.log(res);
                            if (res.data.success) {
                                this.$router.push({ name: "admin.accounts" });
                            }
                        });
                    return;
                }
                this.$request
                    .post(
                        "http://localhost:5268/api/admin/accounts/create",
                        this.account
                    )
                    .then((res) => {
                        if (res.data.success) {
                            this.$router.push({ name: "admin.accounts" });
                        } else {
                            console.log(res.data);
                            this.errors.message = res.data.message;
                        }
                    });
            }
        },
        onCancel() {
            this.account.MSNV = "";
            this.account.HoTenNV = "";
            this.account.ChucVu = "";
            this.account.DiaChi = "";
            this.account.SoDienThoai = "";
            this.account.password = "";
        },
        getDetail(idAccount) {
            this.$request
                .get(
                    `http://localhost:5268/api/admin/accounts/detail/${idAccount}`
                )
                .then((res) => {
                    if (res.data.success) {
                        this.account = res.data.account;
                    }
                });
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
