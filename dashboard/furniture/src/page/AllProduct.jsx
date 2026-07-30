import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../feature/ProductSlice';
import { useNavigate } from 'react-router-dom';

export default function AllProduct() {
    let dispatch = useDispatch();
    let products = useSelector((state) => state.product.products);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProduct());
    }, [])

    let renderProducts = products.map((it,index)=>{
        return <tr key={it.id}>
            <td>{index +1 }</td>
            <td>{it.name}</td>
            <td><img src={it.images[0]} alt="" /></td>
            <td>{it.price}</td>
            <td>{it.discount}</td>
            <td>{it.stock}</td>
            <td>{it.rating}</td>
            <td>{it.reviewCount}</td>
            <td>
                <i onClick={()=>{navigate(`/update-product/${it.id}`)}} className="fa fa-pen"></i>
                {/* <i className="fa fa-eye"></i> */}
                <i className="fa fa-trash-alt"></i>
            </td>
        </tr>
    })
    return (
        <div className='all-product'>
            <h3>Danh sách sản phẩm</h3>
            <p>Sản phẩm</p>
            <table border={1}>
               <thead>
                 <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm </th>
                    <th>Hình ảnh</th>
                    <th>Giá</th>                    
                    <th>Khuyến mãi </th>
                    <th>Tồn kho</th>
                    <th>rating </th>
                    <th>reviewCount</th>
                    <th>Chỉnh sửa</th>
                </tr>
               </thead>
               <tbody>
                {renderProducts}
               </tbody>
            </table>
        </div>
    )
}
