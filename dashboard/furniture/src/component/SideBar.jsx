import React from 'react'
import {Link, NavLink} from "react-router-dom"
export default function SideBar() {
  return (
    <div className='side-bar'>
      <img onClick={() => { navigate("/") }} src="/public/image/logo.PNG" alt="" />
        <ul>
            <li className='active'><Link ><i className="fa fa-cogs"></i>Tổng quan</Link></li>
            <li><Link><i className="fa fa-shopping-bag"></i>Đơn hàng</Link></li>
            <li><Link><i className="fab fa-product-hunt"></i>Sản phẩm</Link></li>
            <li><Link><i className="fa fa-list"></i>Danh mục</Link></li>
            <li><Link><i className="fa fa-user-friends"></i>Khách hàng</Link></li>
            <li><Link><i className="fa fa-address-book"></i>Báo cáo</Link></li>
            {/* <li><NavLink>Khuyến mãi</NavLink></li>
            <li><NavLink>Đánh giá</NavLink></li> */}
        </ul>
    </div>
  )
}
