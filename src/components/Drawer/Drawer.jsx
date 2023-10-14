import React from 'react'
import style from "./Drawer.module.scss"
import { Link } from 'react-router-dom'
import AppContext from '../../context';
import { useCart } from '../../hooks/useCart';

export default function Drawer({ closeDrawer, cartDrawer = [], onRemoveCart, opened }) {
    const [isOrderCompete, setIsOrderCompete] = React.useState(false)
    const { setCart, totalPrice } = useCart();
    const {setOpenCard} = React.useContext(AppContext)
    console.log(cartDrawer);
    const onClickOrder = () => {
        setIsOrderCompete(true)
        setCart([])
    }
    return (
        <div className={`${style.overlay} ${opened ? style.overlayVisible : ''}`}>
            <div className={style.drawer}>
                <div className={style.header}>
                    <h3>Корзина</h3>
                    <img onClick={closeDrawer} className="cu-p" width={32} height={32} src="img/cross.svg" alt="cross" />
                </div>

                {
                    cartDrawer.length > 0 ?
                        <div className="d-flex flex-column flex">
                            <div className={style.items}>
                                {
                                    cartDrawer.map(item => (
                                        <div className={style.card}>
                                            <img className="mr-20" src={item.imageUrl} width={70} height={70} alt="cart" />
                                            <div className={style.titlePrice}>
                                                <h3>{item.title}</h3>
                                                <p>{item.price}</p>
                                            </div>
                                            <img onClick={() => onRemoveCart(item)} className="cu-p" width={32} height={32} src="img/cross.svg" alt="cross" />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className={style.price}>
                                <div className="d-flex justify-between align-center mb-20">
                                    <span className="mr-5">Итого:</span>
                                    <p className={style.border}></p>
                                    <p className="ml-5">{Math.round(totalPrice * 1.05)} руб.</p>
                                </div>
                                <div className="d-flex justify-between align-center mb-25">
                                    <span className="mr-5">Налог 5%:</span>
                                    <p className={style.border}></p>
                                    <p className="ml-5">{Math.round(totalPrice * 0.05)} руб.</p>
                                </div>
                                <button onClick={onClickOrder} className={style.button}>Оформить заказ <img src="img/arrow.svg" /></button>
                            </div>
                        </div> :

                        <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
                            <img className='mb-20' width={200} src={isOrderCompete ? "img/complete-order.svg" : "img/empty-box.png"} alt='empty-box' />
                            <h2>{isOrderCompete ? "Заказ оформлен" : "Корзина пустая"}</h2>
                            <p className='opacity-6'>{isOrderCompete ? "Ваш заказ #18 скоро будет передан курьерской доставке" : "Добавьте хотя бы один товар"}</p>
                            <Link to="/react-sneakers/">
                                <button onClick={() => setOpenCard(false)} className='greenButton mb-50 pr-35'>
                                    <img className='mr-20' src='img/arrow.svg' alt='arrow' />
                                    Назад
                                </button>
                            </Link>
                        </div>
                }
            </div>
        </div>
    );
}