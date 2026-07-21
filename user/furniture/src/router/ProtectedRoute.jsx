import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Kiểm tra trạng thái đăng nhập (từ localStorage, context, hoặc state)
  const isLoggedIn = localStorage.getItem("auth") === "true";

  // Nếu chưa login, chuyển về trang login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã login, hiển thị component con
  return children;
}