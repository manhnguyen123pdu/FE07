import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // LẤY USER TỪ LOCAL STOARE VỀ 
  let user =  JSON.parse(localStorage.getItem("user"))
  let isLoggedIn = false;
  if(user!=null&& user.phone !=""){
    isLoggedIn = true
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã login, hiển thị component con
  return children;
}