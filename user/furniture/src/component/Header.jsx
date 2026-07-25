import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProduct } from '../feature/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
    let [search, setSearch] = useState();
    let[productFindByName,setProductFindByName] = useState([])
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let products = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(fetchProduct());

    }, [])
    let searchProduct = (e) => {
        let productFindByName = []
        for(let i =0; i<products.length; i++){
          
            if(products[i].name.toLowerCase().includes(e.target.value.toLowerCase()) &&e.target.value.trim()!="" &&productFindByName.length<5 ){
                productFindByName.push(products[i])
            }
        }
        setProductFindByName(productFindByName)

    }
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
                    <img onClick={() => { navigate("/") }} src="/public/image/logo.PNG" alt="" />
                </div>
                <nav>
                    <ul>
                        <li onClick={() => { navigate("/") }} >Trang chủ</li>
                        <li>Sản phẩm</li>
                        <li>Bộ sưu tập</li>
                        <li>Khuyến mãi</li>
                        <li>Tin tức</li>
                        <li>Liên hệ</li>
                    </ul>
                </nav>
                <div className="info">
                    <div className="search">
                        <input onChange={searchProduct} placeholder='Tìm kiếm sản phẩm' type="text" /> <button><i className="fa fa-search"></i></button>
                        <div className="overlay">
                            {
                                productFindByName.map((p)=>{
                                    return <di key={p.id} onClick={()=>navigate(`/detail/${p.id}`)} className='overlay-item'>
                                        <img src={p?.images[0]} alt="" />
                                        <p>{p.name}</p>
                                        <br />
                                    </di>
                                })
                            }
                        </div>
                    </div>
                    <i className=" icon fa fa-user"></i>
                    <i className=" icon fa fa-heart"></i>
                    <i onClick={() => { navigate("/cart") }} className=" icon fa fa-shopping-cart"></i>
                </div>
            </div>
        </header>

    )
}
