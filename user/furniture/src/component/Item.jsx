import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Item(props) {
    let navigate = useNavigate();
    let item = props.item
    return (
        <div onClick={() => { navigate(`/detail/${item.id}`) }} className="item">
            <img src={item.images[1]} alt="" />
            <h4>{item.name}</h4>
            <h3>{Number(item.price).toLocaleString()}đ</h3>
            <p><span className='old-price'>{item.oldPrice}</span> <span className='discount'>-{item.discount}%</span></p>
        </div>
    )
}
