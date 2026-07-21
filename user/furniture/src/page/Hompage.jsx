import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from '../feature/ProductSlice'
import { Link, useNavigate } from "react-router-dom"
import Footer from '../component/Footer'
import Benifit from '../component/Benifit'
import Item from '../component/Item'
export default function Hompage() {
    let [categories, setCategories] = useState([])
    let dispatch = useDispatch();
    let products = useSelector((state) => state.product.products);
    let navigate = useNavigate();
    // fetchCategory
    let fetchCategory = async () => {
        let rawData = await axios.get("http://localhost:3000/categories")
        setCategories(rawData.data)
    }
    useEffect(() => {
        dispatch(fetchProduct());
        fetchCategory();

    }, [])

    //  reder Category 
    let renderCategory = categories.map((ct) => {
        return <div className="item" key={ct.id}>
            <img src={ct.image} alt="" />
            <p>{ct.name}</p>
        </div>
    })

    let productsDislay = products.slice(0, 5);
    let renderProducts = productsDislay.map((item) => {
        return <Item key={item.id} item = {item}></Item>
    })
    return (
        <div>
            {/* header */}
            <Header />
            {/* banner */}
            <section className="banner">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="./public/image/banner/1.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="./public/image/banner/2.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="./public/image/banner/3.jpg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </section>

            {/* category */}
            <section className="category">
                {renderCategory}
            </section>

            {/* intro */}
            <section className="intro">
                <img src="./public/image/intro/intro2.png" alt="" />
                <img src="./public/image/intro/intro1.png" alt="" />
            </section>

            {/* product */}
            <section className="product">
                <div className="product-title">
                    <h3>Sản phẩm nổi bật</h3>
                    <Link>Xem tất cả</Link>
                </div>
                <div className="content">
                    {renderProducts}
                </div>
            </section>

            {/* benefit */}
            <Benifit/>
            {/* footer */}
           <Footer/>
        </div>
    )
}

