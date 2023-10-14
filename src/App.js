import './index.scss';
import 'macro-css';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import AppContext from './context';

import Header from "./components/Header/Header"
import Drawer from './components/Drawer/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
  const [openCard, setOpenCard] = React.useState(false)
  const [itemsFavorites, setItemsFavorites] = React.useState([])
  const [input, setInput] = React.useState('')
  const [cart, setCart] = React.useState([])
  //const [favorites, setFavorites] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const card = [
    {
      "id": "1",
      "title": "Мужские Кроссовки Nike Blazer Mid Suede",
      "imageUrl": "img/sneakers/1.jpg",
      "price": "12999"
    },
    {
      "id": "2",
      "title": "Мужские Кроссовки Nike Air Max 270",
      "imageUrl": "img/sneakers/2.jpg",
      "price": "10999"
    },
    {
      "id": "3",
      "title": "Мужские Кроссовки Nike Air Max 270",
      "imageUrl": "img/sneakers/3.jpg",
      "price": "9000"
    },
    {
      "id": "4",
      "title": "Кроссовки Puma X Aka Boku Future Rider",
      "imageUrl": "img/sneakers/4.jpg",
      "price": "8000"
    },
    {
      "id": "5",
      "title": "Мужские Кроссовки Nike Blazer Mid Suede",
      "imageUrl": "img/sneakers/5.jpg",
      "price": "4000"
    },
    {
      "id": "6",
      "title": "Мужские Кроссовки Nike Air Max 270",
      "imageUrl": "img/sneakers/6.jpg",
      "price": "5000"
    },
    {
      "id": "7",
      "title": "Мужские Кроссовки Nike Air Max 270",
      "imageUrl": "img/sneakers/7.jpg",
      "price": "6000"
    },
    {
      "id": "8",
      "title": "Мужские Кроссовки Nike Air Max 270",
      "imageUrl": "img/sneakers/8.jpg",
      "price": "7000"
    },
    {
      "id": "9",
      "title": "Мужские Кроссовки Nike Blazer Mid Suede",
      "imageUrl": "img/sneakers/9.jpg",
      "price": "8000"
    },
    {
      "id": "10",
      "title": "Мужские Кроссовки Nike Air Max 270",
      "imageUrl": "img/sneakers/10.jpg",
      "price": "20000"
    }
  ]

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://64e77e85b0fd9648b790096d.mockapi.io/cart')
      const cardResponse = await axios.get('https://64e77e85b0fd9648b790096d.mockapi.io/items')

      setIsLoading(false)

      setCart(cartResponse.data)
      setItemsFavorites(cardResponse.data)
    }
    fetchData();
  }, []);
  // React.useEffect(()=>{
  //   cart.forEach(obj=>{
  //     setCartID(prev=>[...prev, obj.id])
  //   })
  // }, [cart]);

  const onChangeInput = (event) => {
    setInput(event.target.value)
  }

  const onAddToCart = async (obj) => {
    try{
      const findItem = cart.find(item => Number(item.id) === Number(obj.id))
      if (findItem) {
        setCart(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        await axios.delete(`https://64e77e85b0fd9648b790096d.mockapi.io/cart/${Number(findItem.key)}`)
      } else {
        const {data} = await axios.post('https://64e77e85b0fd9648b790096d.mockapi.io/cart', obj)
        setCart(prev => [...prev, data])
      }
    } catch (error) {
      alert("Ошибка, связанная с корзиной")
      console.error(error)
    }
  }


  const onAddToFavorites = async (obj) => {
    try{
      const findFavorites = itemsFavorites.find(item => Number(item.id) === Number(obj.id));
      if (findFavorites) {
        setItemsFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        await axios.delete(`https://64e77e85b0fd9648b790096d.mockapi.io/items/${Number(findFavorites.key)}`)
      } else {
        const {data} = await axios.post('https://64e77e85b0fd9648b790096d.mockapi.io/items', obj)
        setItemsFavorites(prev => [...prev, data])
      }
    } catch(error){
      alert("Ошибка, связанная с избранными")
      console.error(error)
    }

  }

  const isItemAdded = (id) => {
    return cart.some(item => Number(item.id) === Number(id))
  }
  const isItemFavorites = (id) => {
    return itemsFavorites.some(item => Number(item.id) === Number(id))
  }
  return (
    <AppContext.Provider value={{ card, input, cart, setCart, itemsFavorites, isLoading, isItemAdded, setOpenCard, isItemFavorites }}>
      <div className="wrapper">
        {
          openCard && <Drawer
            closeDrawer={() => setOpenCard(false)}
            cartDrawer={cart}
            onRemoveCart={onAddToCart}
            opened={openCard}
          />

        }
        <Header openDrawer={() => setOpenCard(true)} />

        <Routes>
          <Route
            path="/react-sneakers"
            exact
            element={
              <Home
                input={input}
                onChangeInput={onChangeInput}
                card={card}
                cart={cart}
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
                isLoading={isLoading}
              />
            }
          ></Route>

          <Route path='favorites' exact element={
            <Favorites
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
            />
          }
          ></Route>

          <Route path='orders' exact element={
            <Orders
            />
          }
          ></Route>

        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
