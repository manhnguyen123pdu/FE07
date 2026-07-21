import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    let navigate = useNavigate()
  return (
         <header>
                <div className="header__top">
                    <div className="content">
                        <p> <i className="fa fa-shuttle-van"></i> Miễn phí vận chuyển đơn hàng từ 2.000.000đ</p>
                        <ul>
                            <li><i className="fa fa-map-marked-alt"></i> Hệ thống cửa hàng</li>
                            <li><i className="fa fa-info"></i> Hỗ trợ</li>
                            <li><i className="fa fa-book-open"></i> Về chúng tôi</li>
                        </ul>
                    </div>
                </div>
                <div className="header__main">
                    <div className="logo">
                        <img src="/public/image/logo.PNG" alt="" />
                    </div>
                    <nav>
                        <ul>
                            <li>Trang chủ</li>
                            <li>Sản phẩm</li>
                            <li>Bộ sưu tập</li>
                            <li>Khuyến mãi</li>
                            <li>Tin tức</li>
                            <li>Liên hệ</li>
                        </ul>
                    </nav>
                    <div className="info">
                        <div className="search">
                            <input placeholder='Tìm kiếm sản phẩm' type="text" /> <button><i className="fa fa-search"></i></button>
                            
                        </div>
                        <i className=" icon fa fa-user"></i>
                        <i className=" icon fa fa-heart"></i>
                        <i onClick={()=>{navigate("/cart")}} className=" icon fa fa-shopping-cart"></i>
                    </div>
                </div>
            </header>

  )
}
