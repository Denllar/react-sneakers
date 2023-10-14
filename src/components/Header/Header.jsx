import { Link } from "react-router-dom"
import style from "./Header.module.scss"
import React from "react"
import { useCart } from "../../hooks/useCart";

function Header({ openDrawer }) {

    const {totalPrice} = useCart();
    return (
        <header className="d-flex justify-between align-center pt-40 pb-40">
            <Link to="/react-sneakers/" style={{ textDecoration: 'none' }}>
                <div className="left d-flex align-center">
                    <img width={40} height={40} src="img/logo.svg" alt="logo" />
                    <div className="ml-15">
                        <h2 className="text-uppercase">react sneakers</h2>
                        <h3>Магазин лучших кроссовок</h3>
                    </div>
                </div>
            </Link>
            <div className="right d-flex align-center">
                <div onClick={openDrawer} className="d-flex cu-p align-center">
                    <img width={18} height={18} src="img/cart.svg" alt="cart" />
                    <p className="ml-10">{totalPrice} руб</p>
                </div>
                <Link to="/react-sneakers/favorites"><img className="mr-30 ml-30 cu-p" width={21} height={19} src="img/favorite.svg" alt="cart" /></Link>
                <Link to="/react-sneakers/orders"><img className="cu-p" width={20} height={20} src="img/user.svg" alt="userIcon " /></Link>
            </div>
        </header>
    )
}

export default Header