import style from './Card.module.scss'
import React from 'react'
import ContentLoader from "react-content-loader"
import AppContext from '../../context'

function Card({ 
    id,
    title, 
    imageUrl, 
    price, 
    onAddToCart, 
    onAddToFavorites, 
    favorited=false,  
    loading=false }) {

    const {isItemAdded, isItemFavorites} = React.useContext(AppContext)
    const [isFavorites, setIsFavorites] = React.useState(favorited)
    const obj = { id, key: id, title, imageUrl, price }
    const onPlus = () => {
        onAddToCart(obj)
    }
    const onFavorites = () => {
        onAddToFavorites(obj)
        //setIsFavorites(prev => !prev)
    }
    return (
        <div className={style.content}>

            {
                loading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={200}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    className='mt-35 ml-15'
                >
                    <rect x="0" y="110" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="133" rx="3" ry="3" width="93" height="15" />
                    <rect x="0" y="167" rx="8" ry="8" width="80" height="24" />
                    <rect x="117" y="159" rx="8" ry="8" width="32" height="32" />
                </ContentLoader> : <><img onClick={onFavorites} width={32} height={32} className={style.favorites} src={isItemFavorites(id) ? 'img/liked.svg' : 'img/unliked.svg'} alt='unliked' />
                    <img width={133} height={112} className='mt-20' src={imageUrl} alt='sneakers' />
                    <p>{title}</p>
                    <div className='price d-flex justify-between'>
                        <div className={style.price}>
                            <p>ЦЕНА:</p>
                            <b>{price} руб</b>
                        </div>
                        <img onClick={onPlus} className='mr-30 cu-p' src={isItemAdded(id) ? 'img/added.svg' : 'img/plus.svg'} alt='plus' />
                    </div></>
            }

        </div>
    )
}

export default Card