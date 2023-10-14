import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";
import Info from "../components/Info";

export default function Favorites({ onAddToCart, onAddToFavorites }) {
    const { itemsFavorites } = React.useContext(AppContext)
    return (
        <div>
            {
                itemsFavorites.length > 0 ?
                    <div>
                        <div className="search-block d-flex justify-between align-center">
                            <h1 className="title">Мои закладки</h1>
                        </div>
                        <div className='content d-flex flex-wrap'>
                            {
                                itemsFavorites
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
                        title={"Закладок нет :("}
                        image={"img/smile.svg"}
                        description={"Вы ничего не добавляли в закладки"}
                        buttonDescription={"Назад"}
                    />
            }

        </div>
    );
}