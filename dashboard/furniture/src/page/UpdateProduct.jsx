import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProductByID } from '../feature/ProductSlice';
import { useFormik } from 'formik';
import axios from 'axios';
const colorsRange = [
    { name: "Trắng", code: "#FFFFFF" },
    { name: "Đen", code: "#000000" },
    { name: "Xám", code: "#9E9E9E" },
    { name: "Xám nhạt", code: "#D3D3D3" },
    { name: "Xám đậm", code: "#616161" },

    { name: "Nâu", code: "#8B5A2B" },
    { name: "Nâu đậm", code: "#6A625A" },
    { name: "Nâu gỗ", code: "#A0522D" },
    { name: "Óc chó", code: "#4A3B2C" },
    { name: "Sồi", code: "#D4B896" },

    { name: "Tự nhiên", code: "#C89B67" },
    { name: "Be", code: "#F5F5DC" },
    { name: "Vàng kem", code: "#FFF8DC" },
    { name: "Trắng sứ", code: "#F8F8FF" },

    { name: "Đỏ", code: "#FF0000" },
    { name: "Xanh lá", code: "#008000" },
    { name: "Xanh rêu", code: "#4B6A4B" },
    { name: "Xanh mint", code: "#98FF98" },
    { name: "Xanh dương", code: "#0000FF" },
    { name: "Xanh navy", code: "#000080" },

    { name: "Vàng", code: "#FFD700" },
    { name: "Cam", code: "#FFA500" },
    { name: "Hồng", code: "#FFC0CB" },
    { name: "Tím", code: "#800080" }
];
export default function UpdateProduct() {
    let param = useParams();
    let id = param.id;
    let dispatch = useDispatch();
    let product = useSelector((state) => state.product.currentProduct)
    let formik = useFormik({
        initialValues: {},
        onSubmit: async(value) => {
            let upadateProduct = {
                id: product.id,
                name: value.name,
                slug: product.slug,
                category:value.category,
                brand:value.brand,
                price: value.price,
                oldPrice: value.oldPrice,
                discount: value.discount,
                rating: product.rating,
                reviewCount: product.reviewCount,
                sold: product.sold,
                shortDescription:value.shortDescription,
                description:value.description,
                images: product.images,
                variants: {
                    sizes:value.sizes,
                    materials:value.materials,
                    colors: value.colors.map((cl)=>{
                        let colorfind = colorsRange.find(c=>c.name == cl);
                        return {
                             name: cl,
                            code:colorfind ? colorfind.code:"#00000",
                        }
                    })
                    
                },

                stock: value.stock,
                sku: value.sku,
                features: product.features,
                specifications: {
                    material: value.materials,
                    sizes: value.sizes,
                    colors: value.colors,
                    surface: product.specifications.surface,
                    style: product.specifications.style,
                    warranty: value.warranty + "tháng",
                },
                shipping: product.shipping,
                tags: product.tags,
                isFeatured: product.isFeatured,
                status: value.status,
                createdAt: product.createdAt,
            };
            axios.put(`http://localhost:3000/products/${id}`, upadateProduct);
            alert("Lưu thành công")
        }
    })
    useEffect(() => {
        dispatch(fetchProductByID(id))
    }, [])

    useEffect(() => {
        if (product) {
            let productForm = {
                id: product.id,
                name: product.name,
                category: product.category,
                brand: product.brand,
                price: product.price,
                oldPrice: product.oldPrice,
                discount: product.discount,
                shortDescription: product.shortDescription,
                description: product.description,
                images: product.images,
                sku: product.sku,
                sizes: product.variants?.sizes,
                materials: product.variants?.materials,
                colors: product.specifications?.colors,
                stock: product.stock,
                status: product.status,
                warranty: product.specifications?.warranty
            }
            formik.setValues(productForm);
        }
    }, [product])
    return (
        <div className='update-product'>
            <h3>Sửa sản phẩm</h3>
            <p>Sản phẩm <i className="fa fa-chevron-right"></i> Sửa sản phẩm</p>
            <div className="info-product">
                <form onSubmit={formik.handleSubmit} action="">
                    <div className="info-left">
                        <div >
                            <button type='submit'>Lưu thay đổi</button>
                            <h4>Thông tin sản phẩm</h4>
                            <label htmlFor="">Tên sản phẩm</label><br />
                            <input onChange={formik.handleChange} value={formik.values.name} type="text" name="name" type="text" id="" /> <br />
                            <label htmlFor="">Danh mục</label><br />
                            <input onChange={formik.handleChange} value={formik.values.category} type="text" name="category" type="text" id="" /> <br />
                            <label htmlFor="">Thương hiệu</label><br />
                            <input onChange={formik.handleChange} value={formik.values.brand} type="text" name="brand" id="" /> <br />
                            <div className='price'>
                                <div>
                                    <label htmlFor="">Giá bán</label><br />
                                    <input onChange={formik.handleChange} value={formik.values.oldPrice} name='oldPrice' id="" /> <br />
                                </div>
                                <div>
                                    <label htmlFor="">Giá khuyến mãi</label><br />
                                    <input onChange={formik.handleChange} value={formik.values.price} name='price' type="text" /> <br />
                                </div>
                            </div>
                            <div className='price'>
                                <div>
                                    <label htmlFor="">SKU(mã sản phẩm)</label><br />
                                    <input onChange={formik.handleChange} value={formik.values.sku} name='sku' type="text" /> <br />
                                </div>
                                <div>
                                    <label htmlFor="">Số lượng</label><br />
                                    <input onChange={formik.handleChange} value={formik.values.stock} name='stock' type="text" /> <br />
                                </div>
                            </div>
                        </div>
                        <div >
                            <label htmlFor="">Mô tả ngắn</label> <br />
                            <textarea onChange={formik.handleChange} value={formik.values.shortDescription} name='shortDescription' ></textarea> <br />
                            <label htmlFor="">Mô tả chi tiết</label> <br />
                            <textarea onChange={formik.handleChange} value={formik.values.description} name='description' rows={10} id="editor"></textarea>
                        </div>
                    </div>
                    <div className="info-right">
                        <h4>Trạng thái</h4>
                        <select onChange={formik.handleChange} name='status' value={formik.values.status}>
                            <option value="ACTIVE">Đang hiển thị</option>
                            <option value="NO ACTIVE">Không hiển thị</option>
                        </select>
                        <h4>Thông tin khác</h4>

                        <label htmlFor="">Chất liệu</label> <br />
                        <input onChange={formik.handleChange} value={formik.values.materials} name='materials' type="text" /> <br />
                        <label htmlFor="">Kích thước</label> <br />
                        <input onChange={formik.handleChange} value={formik.values.sizes} name='sizes' type="text" /> <br />
                        <label htmlFor="">Màu sắc</label> <br />
                        <input onChange={formik.handleChange} value={formik.values.colors} name='colors' type="text" /> <br />
                        <label htmlFor="">Bảo hành</label> <br />
                        <input onChange={formik.handleChange} value={formik.values.warranty} name='warranty' type="text" /> <br />
                        <label htmlFor="">Khuyễn mãi</label> <br />
                        <input onChange={formik.handleChange} value={formik.values.discount} name='discount' type="text" /> <br />


                    </div>
                </form>
            </div>
        </div>
    )
}
