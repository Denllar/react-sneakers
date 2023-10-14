import React from "react";
import Card from "../components/Card/Card";

export default function Home({ input, onChangeInput, card, onAddToCart, onAddToFavorites, isLoading }) {
    const renderCard = () => {
        const filteredCard =  card.filter(item => 
            item.title.toLowerCase().includes(input.toLowerCase()));
        return (isLoading ? [...Array(8)] : filteredCard)
            .map((obj, index) => (
                <Card
                    key={index}
                    onAddToCart={() => onAddToCart(obj)}
                    onAddToFavorites={(obj) => onAddToFavorites(obj)}
                    loading={isLoading}
                    {...obj}
                />
            )
        );
    };
    return (
        <div>
            <div className="search-block d-flex justify-between align-center">
                <h1 className="title">{input ? `Поиск по запросу: ${input}` : 'Все кроссовки'}</h1>
                <div className="search-block-input">
                    <img width={14} height={14} src="img/search.svg" alt="search" />
                    <input onChange={onChangeInput} value={input} className="ml-15" placeholder="Поиск..." />
                </div>
            </div>

            <div className='content d-flex flex-wrap'>
                {
                    renderCard()
                }
            </div>
        </div>
    );
}