import React from 'react'

export default function Footer() {
  return (
     <footer>
                <div className="footer__content">
                    <div className="item it1">
                        <h5>Đăng ký nhận tin</h5>
                        <p>Nhận ngay thông tin về sản phẩm và các ưu đãi mới nhất của chúng tôi</p>
                        <form action="">
                            <input type="text" name="" id="" />
                            <button>Đăng ký</button>
                        </form>
                    </div>
                    <div className="item it2">
                        <h5>Về chúng tôi</h5>
                        <ul>
                            <li>Giới thiệu</li>
                            <li>Tuyển dụng</li>
                            <li>Hệ thống cửa hàng</li>
                            <li>Liên hệ</li>
                        </ul>
                    </div>
                    <div className="item it2">
                        <h5>Chính sách</h5>
                        <ul>
                            <li>Chính sách bảo mật</li>
                            <li>Chính sách đổi trả</li>
                            <li>Chính sách vận chuyển</li>
                            <li>Điều khoản sử dụng   </li>

                        </ul>
                    </div>
                    <div className="item it2">
                        <h5>Hỗ trợ</h5>
                        <ul>
                            <li>Hướng dẫn mua hàng</li>
                            <li>Hướng dẫn thanh toán</li>
                            <li>Câu hỏi thường gặp</li>
                            <li>Bảo hành & bảo trì</li>
                        </ul>
                    </div>
                    <div className="item it2">
                        <h5>Kết nối với chúng tôi</h5>
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
            </footer>
  )
}
