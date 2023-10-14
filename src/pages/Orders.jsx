import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";
import Info from "../components/Info";

export default function Orders({ onAddToCart, onAddToFavorites }) {
    //const {  } = React.useContext(AppContext)
    return (
        <div>
            {
                [].length > 0 ? 
                    <div>
                        <div className="search-block d-flex justify-between align-center">
                            <h1 className="title">Мои заказы</h1>
                        </div>
                        <div className='content d-flex flex-wrap'>
                            {
                                []
                                    .map((obj, index) => (
                                        <Card
                                            key={index}
                                            id={obj.id}
                                            title={obj.title}
                                            imageUrl={obj.imageUrl}
                                            price={obj.price}
                                            onAddToCart={() => onAddToCart(obj)}
                                            onAddToFavorites={() => onAddToFavorites(obj)}
                                            favorited={true}
                                        />
                                    )
                                    )
                            }
                        </div>
                    </div> :
                    <Info
                        title={"Заказов нет :("}
                        image={"img/smile.svg"}
                        description={"Вы ничего не покупали"}
                        buttonDescription={"Выбрать товар"}
                    />
            }
        </div>
    )
}