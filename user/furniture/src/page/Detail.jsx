import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import Header from '../component/Header'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, fetchProductByID } from '../feature/ProductSlice';
import Benifit from '../component/Benifit';
import Item from '../component/Item';

export default function Detail() {

    let dispatch = useDispatch();
    let param = useParams();
    let id = param.id
    let product = useSelector((state) => state.product.currentProduct);
    let products = useSelector((state) => state.product.products);
    let [imgMain, setImgMain] = useState("") // lỗi 
    let [cartItem, setCartItem] = useState()
    useEffect(() => {
        dispatch(fetchProductByID(id))
        dispatch(fetchProduct());
    }, [id])


    useEffect(() => {
        if (!product?.id) return
        setImgMain(product.images[0]);
        setCartItem(
            {
                productId: product.id,
                quantity: 1,
                colors: product.variants?.colors[0]?.code,
                sizes: product.variants?.sizes[0],
                materials: product.variants?.materials[0],
                price: product.price
            }
        )

    }, [product])

 
    let changeQuantity = (dau) => {
        // coppyobjec
        let newCartItem = { ...cartItem };
        if (dau == "-" && newCartItem.quantity > 1) {
            newCartItem.quantity--;
        } else if (dau == "-" && newCartItem.quantity <= 1) {
            alert("Số lượng tối thiểu");
        } else {
            newCartItem.quantity++;
        }
        setCartItem(newCartItem);
    }
    let changeColor = (cl) => {
        let newCartItem = { ...cartItem };
        newCartItem.colors = cl;
        setCartItem(newCartItem);
    }
    let changeMaterial = (m) => {
        let newCartItem = { ...cartItem };
        newCartItem.materials = m;
        setCartItem(newCartItem);
    }
    let changeSize = (s) => {
        console.log(s)
        let newCartItem = { ...cartItem };
        newCartItem.sizes = s;
        setCartItem(newCartItem);
    }
    let addToCart =() =>{
        let carts = JSON.parse(localStorage.getItem("cart"))||[];
        let index= carts.findIndex((it)=>{
            return it.productId == cartItem.productId && it.sizes ==cartItem.sizes && it.colors ==cartItem.colors && it.materials ==cartItem.materials 
        })
        if(index!=-1 && carts[index].sizes == cartItem.sizes){
             carts[index].quantity ++
        }else{
             carts.push(cartItem);
        }
        alert("Đã thêm giỏ hàng ")
        localStorage.setItem("cart", JSON.stringify(carts));
    }
    // lọc các sản phẩm có chung category 
    let listProductByCategory = products?.filter((item) => {
        return item.category == product.category;
    })
    return (
        <div className='detail'>
            <Header />
            <div className="content">
                <p className='breadCum'>Trang chủ <i className="fa fa-angle-right"></i> Sản Phẩm  <i className="fa fa-angle-right"></i> {product.category}  <i className="fa fa-angle-right"></i> <span>{product.name}</span></p>
                <div className="detail__info">
                    <div className="image-info">
                        <img className="main-img" src={imgMain} alt="img1" />
                        <div className="nav-img">
                            {
                                product.images?.map((url, index) => {
                                    return <img key={index} onClick={() => { setImgMain(url) }} src={url} alt="" />
                                })
                            }
                        </div>

                    </div>
                    <div className="des-info">
                        <p className='des__category'>{product.category}</p>
                        <h3>{product.name}</h3>
                        <div className="vote">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-alt"></i>
                            <span>{product.rating} ({product.reviewCount} Đánh giá) | Đã bán {product.sold}</span>
                        </div>
                        <div className="price">
                            <h3>{Number(product.price).toLocaleString()}đ</h3>
                            <p>{Number(product.oldPrice).toLocaleString()}đ</p>
                            <span>{product.discount} %</span>
                        </div>
                        <p>{product.description}</p>
                        <div className="size">
                            <p>Kích thước</p>
                            {
                                product.variants?.sizes?.map((s, index) => {
                                    let cssActive = s == cartItem?.sizes ? "active1" : ""
                                    return <button onClick={()=>{changeSize(s)}} className={cssActive} key={index}>{s}</button>
                                })
                            }
                        </div>
                        <div className="size">
                            <p>Chất liệu</p>
                            {
                                product.variants?.materials?.map((s, index) => {
                                    let cssActive = s == cartItem?.materials ? "active1" : ""
                                    return <button className={cssActive} onClick={() => { changeMaterial(s) }} key={index}>{s}</button>
                                })
                            }
                        </div>
                        <div className="color">
                            <p>Màu sắc</p>
                            {
                                product.variants?.colors?.map((s, index) => {
                                    let cssActive = s.code == cartItem?.colors ? "active1" : ""
                                    return <button className={cssActive} onClick={() => { changeColor(s.code) }} key={index} style={{ backgroundColor: s.code }}></button>
                                })
                            }
                        </div>
                        <div className="quantity">
                            <p>Số lượng</p>
                            <button onClick={() => { changeQuantity("-") }}>-</button>
                            <input type="text" value={cartItem?.quantity} name="quanlity" />
                            <button onClick={() => { changeQuantity("+") }}>+</button>
                        </div>
                        <div className="purchase">
                            <button onClick={()=>addToCart()} className='add-cart'>Thêm vào giỏ hàng</button>
                            <button className='buy-now'>Mua Ngay</button>
                        </div>
                        <div className="benefit">
                            <div className="item">
                                <i className="fa fa-truck"></i>
                                <div className="text">
                                    <h5>Miễn phí vận chuyển</h5>
                                    <p>Đơn hàng từ 2 triệu đồng</p>
                                </div>
                            </div>
                            <div className="item">
                                <i className="fa fa-check-circle"></i>
                                <div className="text">
                                    <h5>Bảo hành 12 tháng</h5>
                                    <p>Áp dụng tất cả sản phẩm</p>
                                </div>
                            </div>
                            <div className="item">
                                <i className="fa fa-retweet"></i>
                                <div className="text">
                                    <h5>7 ngày đổi trả</h5>
                                    <p>Nếu lỗi từ nhà sản xuất</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-desc">
                    <div>
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Mô tả sản phẩm</button>
                                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Thông tin chi tiết</button>
                                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Hướng dẫn bảo quản</button>
                                <button className="nav-link" id="nav-contact-tab2" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Đánh giá  ({product.reviewCount})</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
                                <div className="text-desc">
                                    <p>{product.description}</p>
                                    <p><b>Chất liệu:  </b> {product.variants?.materials.join()}</p>
                                    <p><b>Kích thước:  </b> {product.variants?.sizes.join()}</p>
                                    <p><b>Màu sắc: </b>{product.specifications?.colors.join()}</p>
                                    <p><b>Bề mặt: </b>{product.specifications?.surface}</p>
                                    <p><b>Phong Cách: </b>{product.specifications?.style}</p>
                                    <p><b>Bảo hành: </b>{product.specifications?.warranty}</p>
                                </div>
                                <img src={product.images?.[0]} alt="" />
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>...</div>
                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>...</div>
                            <div className="tab-pane fade" id="nav-contact2" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>...</div>
                        </div>
                    </div>
                </div>
                <div className="relate product">
                    <h3>Sản phẩm liên quan</h3>

                    <div className="content">
                        {
                            listProductByCategory.map((item) => {
                                return <Item key={item.id} item={item} ></Item>
                            })
                        }
                    </div>
                </div>
                <Benifit />
            </div>
            <Footer />
        </div>
    )
}
