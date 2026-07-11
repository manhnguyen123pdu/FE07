import React from 'react'

export default function Hompage() {
    return (
        <div>
            {/* header */}
            <header>
                <div className="header__top">
                    <div className="content">
                        <p> <i class="fa fa-shuttle-van"></i> Miễn phí vận chuyển đơn hàng từ 2.000.000đ</p>
                        <ul>
                            <li><i class="fa fa-map-marked-alt"></i> Hệ thống cửa hàng</li>
                            <li><i class="fa fa-info"></i> Hỗ trợ</li>
                            <li><i class="fa fa-book-open"></i> Về chúng tôi</li>
                        </ul>
                    </div>
                </div>
                <div className="header__main">
                    <div className="logo">
                        <img src="./public/image/logo.PNG" alt="" />
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
                            <input placeholder='Tìm kiếm sản phẩm' type="text" /> <button><i class="fa fa-search"></i></button>
                            
                        </div>
                        <i class=" icon fa fa-user"></i>
                        <i class=" icon fa fa-heart"></i>
                        <i class=" icon fa fa-shopping-cart"></i>
                    </div>
                </div>
            </header>

            {/* banner */}
            <section className="banner"></section>

            {/* category */}
            <section className="category"></section>

            {/* intro */}
            <section className="intro"></section>

            {/* product */}
            <section className="product"></section>

            {/* benefit */}
            <section className="benefit"></section>

            {/* footer */}
            <footer></footer>
        </div>
    )
}
