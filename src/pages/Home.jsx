import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { AppContext } from "../context/AppContext";
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock"
import NotFoundBlock from "../components/NotFoundBlock";
import Pagination from "../components/Pagination";

/* Альтернативный, но менее удобный способ использования параметров поиска в url:
    const url = `${serverUrl}/items?${category === 0 ? '' : `category=${category}`}&sortBy=${sortType.field}&order=${sortType.order}`; 
*/

const serverUrl = 'https://666d611e7a3738f7cacc3aa7.mockapi.io';
const limit = 8;

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pizzas, setPizzas] = useState([]);
    const [page, setPage] = useState(1);

    const { searchInput } = useContext(AppContext);
    
    const { category, sortType } = useSelector(state => state.filter);

    useLayoutEffect(() => {
        window.scrollTo(window.scrollX, 0);
    }, []);

    useEffect(() => {
        setIsLoading(true);

        const url = new URL(`${serverUrl}/items`);
        if (category !== 0) url.searchParams.append('category', category);
        url.searchParams.append('sortBy', sortType.field);
        url.searchParams.append('order', sortType.order);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);
        if (searchInput) url.searchParams.append('search', searchInput); /* Warning: в mockApi не работает фильтрация по category и по search одновременно */

        axios.get(url)
            .then(response => {
                setPizzas(response.data);
            })
            .catch(err => {
                setPizzas([]);
            })
            .finally(() => setIsLoading(false));

    }, [category, sortType, page, searchInput]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {!isLoading && !pizzas.length
                ? <NotFoundBlock text="К сожалению, таких пицц у нас нет..." />
                : (
                    <div className="content__items">
                        {isLoading
                            ? Array(limit).fill(null).map((_, idx) => <Skeleton key={idx} />)
                            : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
                        }
                    </div>
                )
            }
            <Pagination onChange={setPage} />
        </div>
    )
};