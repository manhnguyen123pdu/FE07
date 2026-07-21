import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { fetchProduct } from '../feature/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import Benifit from '../component/Benifit';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
    let dispatch = useDispatch();
    let navigate = useNavigate()
    let [carts, setCarts] = useState(JSON.parse(localStorage.getItem("cart")) || [])
    let products = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(fetchProduct());
    }, [])


    let deleteCart = (index) => {
        let newCarts = [...carts]
        newCarts.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(newCarts))
        setCarts(newCarts)
    }
    let changeQuantity = (index, dau) => {
        let newCarts = [...carts]
        if (dau == "+") {
            newCarts[index].quantity++
        } else {
            if (newCarts[index].quantity <= 1) {
                newCarts.splice(index, 1);
            } else {
                newCarts[index].quantity--
            }
        }
        localStorage.setItem("cart", JSON.stringify(newCarts))
        setCarts(newCarts)
    }

    let priceBeforeDiscount = 0;
    let priceAfterDiscount = 0;
    for (let i = 0; i < carts.length; i++) {
        let p = products.find((p) => {
            return p.id == carts[i].productId
        })
        priceBeforeDiscount += (Number(p?.oldPrice) * carts[i].quantity)
        priceAfterDiscount += (Number(carts[i].price) * carts[i].quantity)
    }


    let renderCarts = carts.map((cart, index) => {
        let p = products.find((p) => {
            return p.id == cart.productId
        })
        return <tr key={index}>
            <td>{index + 1}</td>
            <td className='info-product'>
                <img src={p?.images[0]} alt={index} />
                <div className="text">
                    <h5>{p?.name} </h5>
                    <p>Kích thước: {cart.sizes} </p>
                    <p>Chất liệu: {cart.materials}</p>
                    <p>Màu sắc: {cart.colors}</p>
                </div>
            </td>
            <td>{Number(cart.price).toLocaleString()}đ</td>
            <td><button onClick={() => { changeQuantity(index, "-") }}>-</button> <input onChange={() => { }} value={cart.quantity} type="text" name="" id="" /> <button onClick={() => { changeQuantity(index, "+") }}>+</button></td>
            <td><b>{(Number(cart.price) * Number(cart.quantity)).toLocaleString()}đ</b></td>
            <td><button onClick={() => { deleteCart(index) }}><i className="fa fa-trash-alt"></i></button></td>
        </tr>
    })



    return (
        <div className='cart-page'>
            <Header />
            <div className="content">
                <p>Trang chủ  <i className="fa fa-angle-right"></i> giỏ hàng </p>
                <h3>Giỏ Hàng</h3>
                <div className="cart-content">
                    <div className="cart-left">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCarts}
                            </tbody>
                        </table>
                    </div>
                    <div className="cart-right">
                        <h3>Thông tin đơn hàng</h3>
                        <div className="text">
                            <p>Tạm tính</p>
                            <p><b>{priceBeforeDiscount.toLocaleString()}đ</b></p>
                        </div>
                        <div className="text">
                            <p>Giảm giá</p>
                            <p><b>{(priceBeforeDiscount - priceAfterDiscount).toLocaleString()}đ</b></p>
                        </div>
                        <div className="text">
                            <p>Phí vận chuyển</p>
                            <p><b>Miễn phí</b></p>
                        </div>
                        <div className="text">
                            <p>Tổng cộng</p>
                            <p><b>{priceAfterDiscount.toLocaleString()}đ</b>

                            </p>
                        </div>
                        <button onClick={()=>{navigate("/checkout")}}>Tiến hành thanh toán</button>
                        <button>Thanh toán với</button>
                    </div>
                </div>
            </div>
            <Benifit />
            <Footer />
        </div>
    )
}
