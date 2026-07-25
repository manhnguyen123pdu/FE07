import React, { use, useEffect } from 'react'
import Header from '../component/Header'
import Benifit from '../component/Benifit'
import Footer from '../component/Footer'
import { useFormik } from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../feature/ProductSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function CheckOut() {
  let user = JSON.parse(localStorage.getItem("user"))
  let carts = JSON.parse(localStorage.getItem("cart"))
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let products = useSelector((state) => state.product.products);
  let formik = useFormik({
    initialValues: {
      shippingFee: "0",
      paymentMethod: "COD",
      note: ""
    },
    onSubmit:async (value) => {
      let order = {
        userId: user.id,
        products: carts,
        shippingFee: Number(value.shippingFee),
        paymentMethod: value.paymentMethod,
        status: "new",
        note: value.note,
        createdAt: new Date().toISOString()
      }
      axios.post("http://localhost:3000/orders", order);
      alert("Đặt hàng thành công");
      localStorage.setItem("cart",JSON.stringify([]));
      navigate("/");
    }
  })
  useEffect(() => {
    dispatch(fetchProduct());
  }, [])

  let priceBeforeDiscount = 0;
  let priceAfterDiscount = 0;
  for (let i = 0; i < carts.length; i++) {
    let p = products.find((p) => {
      return p.id == carts[i].productId
    })
    priceBeforeDiscount += (Number(p?.oldPrice) * carts[i].quantity)
    priceAfterDiscount += (Number(carts[i].price) * carts[i].quantity)
  }
  return (
    <div>
      <Header />
      <div className="check-out">
        <p className='bread-cumb'>Trang chủ <i className="fa fa-angle-right"></i> Giỏ Hàng <i className="fa fa-angle-right"></i> Thanh Toán</p>
        <h3>Thanh Toán</h3>
        <div className="check-out__content">
          <div className="check-out__left">
            <form onSubmit={formik.handleSubmit} action="">
              <div className="info-shipping">
                <h4>1.Thông tin giao hàng</h4>
                <div className='info'>
                  <div>
                    <label htmlFor="name">Họ tên</label> <br />
                    <input defaultValue={user.fullName} type="text" placeholder='Nhập họ tên' name="name" id="" />
                  </div>
                  <div>
                    <label htmlFor="phone">Số điện thoại</label> <br />
                    <input defaultValue={user.phone} type="text" placeholder='Nhập số điện thoại' name="phone" id="" />
                  </div>
                </div>

                <label htmlFor="email">Email</label> <br />
                <input defaultValue={user.email} type="text" name='email' placeholder='Nhập email' />
                <br />
                <label htmlFor="">Địa chỉ</label> <br />
                <input defaultValue={user.address.street} type="text" placeholder='Nhập địa chỉ' />

                <div className='address'>
                  <div>
                    <label htmlFor="">Tỉnh/thành phố</label> <br />
                    <input defaultValue={user.address.province} type="text" placeholder='Nhập tỉnh/Thành phố' />
                  </div>
                  <div>
                    <label htmlFor="">Quận/Huyện</label> <br />
                    <input defaultValue={user.address.district} type="text" placeholder='Nhập Quận/Huyện' />
                  </div>
                  <div>
                    <label htmlFor="">Xã/Phường</label> <br />
                    <input value={user.address.district.ward} type="text" placeholder='Nhập Xã/Phường' />
                  </div>
                </div>
                <label htmlFor="">Ghi chú đơn hàng</label> <br />
                <textarea onChange={formik.handleChange} value={formik.values.note} name="note" placeholder='Ghi chú về đơn hàng, thời gian giao hàng ' ></textarea>

              </div>

              <div className="shipping-delevery">
                <h4>2. Phương thức vận chuyển</h4>
                <div className="shipping-item">
                  <div >
                    <input checked={formik.values.shippingFee == "0" ? true : false} onChange={formik.handleChange} type="radio" name='shippingFee' defaultValue={"0"} />
                    <label htmlFor="">
                      <h6>Giao hàng tiêu chuẩn</h6>
                      <p>Dự kiến giao hàng từ 2-4 ngày </p>
                    </label>
                  </div>
                  <p>Miễn phí</p>
                </div>
                <div className='shipping-item'>
                  <div>
                    <input checked={formik.values.shippingFee == "60000" ? true : false} onChange={formik.handleChange} type="radio" name='shippingFee' defaultValue={"60000"} />

                    <label htmlFor="">
                      <h6>Giao hàng nhanh</h6>
                      <p>Dự kiến giao hàng từ 24-48 giờ </p>
                    </label>
                  </div>
                  <p>60.000đ</p>
                </div>
              </div>
              <div className="shipping-delevery">
                <h4>3. Phương thức thanh toán</h4>
                <div className="shipping-item">
                  <div >
                    <input checked={formik.values.paymentMethod == "COD" ? true : false} onChange={formik.handleChange} type="radio" name='paymentMethod' defaultValue={"COD"} />
                    <label htmlFor="">
                      <h6>Thanh toán khi nhận hàng (COD)</h6>
                      <p>Thanh toán bằng tiền mặt khi nhận hàng </p>
                    </label>
                  </div>
                  <p><i className="fa fa-money-bill-wave"></i></p>
                </div>
                <div className='shipping-item'>
                  <div>
                    <input checked={formik.values.paymentMethod == "BANK" ? true : false} defaultValue={"BANK"} onChange={formik.handleChange} type="radio" name='paymentMethod' />
                    <label htmlFor="" >
                      <h6>Chuyển khoản qua ngân hàng</h6>
                      <p>Chuyển khoản qua tài khoản ngân hàng </p>
                    </label>
                  </div>
                  <p><i className="fa fa-piggy-bank"></i></p>
                </div>
                <div className='shipping-item'>
                  <div>
                    <input checked={formik.values.paymentMethod == "MOMO" ? true : false} defaultValue={"MOMO"} onChange={formik.handleChange} type="radio" name='paymentMethod' />
                    <label htmlFor="">
                      <h6>Thanh toán bằng ví điện tử</h6>
                      <p>Thanh toán qua ví điện tử MOMO </p>
                    </label>
                  </div>
                  <p><i className="fa fa-wallet"></i></p>
                </div>
              </div>
              <button type='submit'>submit</button>
            </form>

          </div>
          <div className="check-out__right">
            <h3>Đơn hàng ({carts.length} Sản phẩm)</h3>
            <div className="all-carts">
              {
                carts.map((item, index) => {
                  // tìm product dựa vào productID 
                  let product = products.find(it => it.id == item.productId)
                  return <div key={index} className="cart-item">
                    <img src={product?.images[0]} alt="" />
                    <div className="cart-text">
                      <h5>{product?.name}</h5>
                      <p>{item.sizes} , {item.materials}</p>
                      <p> Màu sắc: {item.colors}</p>

                      <div className='price'>
                        <p>x {item.quantity}</p>
                        <h5>{Number(item.price).toLocaleString()}đ</h5>
                      </div>
                    </div>
                  </div>
                })
              }
              <hr />
              <div className="info-purchase">
                <h3>Thông tin đơn hàng</h3>
                <div className="text">
                  <p>Tạm tính</p>
                  <p><b>{priceBeforeDiscount.toLocaleString()}đ</b></p>
                </div>
                <div className="text">
                  <p>Giảm giá</p>
                  <p><b>- {(priceBeforeDiscount - priceAfterDiscount).toLocaleString()}đ</b></p>
                </div>
                <div className="text">
                  <p>Phí vận chuyển</p>
                  <p><b>{Number(formik.values.shippingFee).toLocaleString()}đ</b></p>
                </div>
                <div className="text">
                  <p>Tổng cộng</p>
                  <p><b>{(priceAfterDiscount +Number(formik.values.shippingFee)).toLocaleString()}đ</b>

                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Benifit />
      <Footer />
    </div>
  )
}
