import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from '../feature/ProductSlice'
import { Link, Outlet, useNavigate } from "react-router-dom"
import Footer from '../component/Footer'
import SideBar from '../component/SideBar'
import Header from '../component/Header'
import AllProduct from './AllProduct'
export default function Hompage() {

    return (
        <div>
            <div className="dashboard">
                <SideBar />
                <div className="content">
                    <Outlet/>
                </div>
            </div>
            {/* footer */}
            <Footer />
        </div>
    )
}

