import { useState, useEffect, useLayoutEffect, useContext } from "react";

import { AppContext } from "../context/AppContext";

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock"
import NotFoundBlock from "../components/NotFoundBlock";
import Pagination from "../components/Pagination";

const serverUrl = 'https://666d611e7a3738f7cacc3aa7.mockapi.io';
const limit = 8;

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pizzas, setPizzas] = useState([]);
    const [page, setPage] = useState(1);
    const { category, sortType, searchInput } = useContext(AppContext);

    const filteredPizzas = pizzas.filter(pizza => pizza.title.toLowerCase().includes(searchInput.toLowerCase())); // работает только фильтрация текущей страницы

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
        // const url = `${serverUrl}/items?${category === 0 ? '' : `category=${category}`}&sortBy=${sortType.field}&order=${sortType.order}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            });
    }, [category, sortType, page]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {!isLoading && !filteredPizzas.length
                ? <NotFoundBlock text="К сожалению, таких пицц у нас нет..." />
                : (
                    <div className="content__items">
                        {isLoading
                            ? Array(limit).fill(null).map((_, idx) => <Skeleton key={idx} />)
                            : filteredPizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
                        }
                    </div>
                )
            }
            <Pagination onChange={setPage} />
        </div>
    )
};