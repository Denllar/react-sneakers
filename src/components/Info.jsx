import React from 'react'
import AppContext from '../context'
import { Link } from 'react-router-dom'

const Info = ({ title, image,  description, buttonDescription }) => {
    const {setOpenCard} = React.useContext(AppContext)
    return (
        <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
            <img className='mb-20' src={image} alt='empty-box' />
            <h2>{title}</h2>
            <p className='opacity-6'>{description}</p>
            <Link to="/react-sneakers">
                <button onClick={()=>setOpenCard(false)} className='greenButton mb-50 pr-35'>
                    <img className='mr-20' src='img/arrow.svg' alt='arrow' />
                    {buttonDescription}
                </button>
            </Link>
        </div>
    )
}
export default Info