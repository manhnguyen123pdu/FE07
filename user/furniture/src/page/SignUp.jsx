import React from 'react'
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
export default function SignUp() {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            phone: "",
            avatar: "",
            gender: "",
            dateOfBirth: "",
            street: "",
            ward: "",
            district: "",
            province: ""

        },
        onSubmit: async (value) => {
            let newUser = {
                fullName: value.fullName,
                email: value.email,
                password: value.password,
                phone: value.phone,
                avatar: value.avatar,
                rol: "USER",
                gender: value.gender,
                dateOfBirth: value.dateOfBirth,
                status: "ACTIVE",
                createdAt: new Date().toISOString(),
                address: {
                    street: value.street,
                    ward: value.ward,
                    district: value.district,
                    province: value.province
                }
            }
           
            try{
                axios.post("http://localhost:3000/users", newUser);
                alert("Đăng ký thành công")
                navigate("/login")
            }catch{
                console.log("lỗi")
            }
        }
    })

    return (
        <div onSubmit={formik.handleSubmit} className="signup-container">
            <form className="login-card">
                <h2>Đăng ký mới </h2>
                <div>
                    {/* Họ và tên */}
                    <label htmlFor="fullName">Họ và tên</label><br />
                    <input onChange={formik.handleChange} value={formik.values.fullName} type="text" id="fullName" name="fullName" /><br /><br />
                    {/* Email */}
                    <label htmlFor="email">Email</label><br />
                    <input onChange={formik.handleChange} value={formik.values.email} type="email" id="email" name="email" /><br /><br />
                    {/* Mật khẩu */}
                    <label htmlFor="password">Mật khẩu</label><br />
                    <input onChange={formik.handleChange} value={formik.values.password} type="password" id="password" name="password" /><br /><br />
                    {/* Số điện thoại */}
                    <label htmlFor="phone">Số điện thoại</label><br />
                    <input onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" name="phone" /><br /><br />
                    {/* Avatar */}
                    <label htmlFor="avatar">Link Avatar</label><br />
                    <input onChange={formik.handleChange} value={formik.values.avatar} type="url" id="avatar" name="avatar" /><br /><br />

                    {/* Giới tính */}
                    <label>Giới tính</label><br />
                    <input onChange={formik.handleChange} type="radio" id="male" name="gender" defaultValue="Nam" />
                    <label htmlFor="male">Nam</label>
                    <input onChange={formik.handleChange} type="radio" id="female" name="gender" defaultValue="Nữ" />
                    <label htmlFor="female">Nữ</label><br /><br />
                    {/* Ngày sinh */}
                    <label htmlFor="dateOfBirth">Ngày sinh</label><br />
                    <input onChange={formik.handleChange} value={formik.values.dateOfBirth} type="date" id="dateOfBirth" name="dateOfBirth" /><br /><br />

                    <h3>Địa chỉ</h3>
                    {/* Đường */}
                    <label htmlFor="street">Đường</label><br />
                    <input onChange={formik.handleChange} value={formik.values.street} type="text" id="street" name="street" /><br /><br />
                    {/* Phường */}
                    <label htmlFor="ward">Phường/Xã</label><br />
                    <input onChange={formik.handleChange} value={formik.values.ward} type="text" id="ward" name="ward" /><br /><br />
                    {/* Quận */}
                    <label htmlFor="district">Quận/Huyện</label><br />
                    <input onChange={formik.handleChange} value={formik.values.district} type="text" id="district" name="district" /><br /><br />
                    {/* Tỉnh */}
                    <label htmlFor="province">Tỉnh/Thành phố</label><br />
                    <input onChange={formik.handleChange} value={formik.values.province} type="text" id="province" name="province" /><br /><br />
                </div>

                <button type="submit">Đăng ký</button>

                <button type="submit">Đăng nhập</button>
                <Link to={"/signup"}>Đăng ký mới</Link>
            </form>
        </div>
    );
}
