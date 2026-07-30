import { useFormik } from "formik"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
export default function Login() {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (value) => {
            let data = await axios.get(`http://localhost:3000/users?email=${value.email}&password=${value.password}`)
            if (data.length != 0) {
                let user = data.data[0];
                user.password = ""
                if (user.role == "ADMIN") {
                    localStorage.setItem("admin", JSON.stringify(user))
                    navigate("/checkout")
                }else{
                    alert("Không có quyên truy cập")
                }
            }

        }
    })
    return (
        <div onSubmit={formik.handleSubmit} className="login-container">
            <form className="login-card">
                <h2>Đăng nhập</h2>
                <p>Chào mừng bạn quay trở lại 👋</p>

                <div className="input-group">
                    <label>Email</label>
                    <input onChange={formik.handleChange} value={formik.values.email} type="email" name="email" placeholder="Nhập email..." />
                </div>

                <div className="input-group">
                    <label>Mật khẩu</label>
                    <input value={formik.values.password}
                        type="password"
                        name="password"
                        placeholder="Nhập mật khẩu..."
                        onChange={formik.handleChange}
                    />
                </div>

                <button type="submit">Đăng nhập</button>
                <Link to={"/signup"}>Đăng ký mới</Link>
            </form>
        </div>
    );
}