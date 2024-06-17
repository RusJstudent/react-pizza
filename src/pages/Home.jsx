import { useState, useEffect, useLayoutEffect, useContext } from "react";

import { AppContext } from "../context/AppContext";

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock"
import NotFoundBlock from "../components/NotFoundBlock";

const serverUrl = 'https://666d611e7a3738f7cacc3aa7.mockapi.io';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pizzas, setPizzas] = useState([]);
    const { category, sortType, searchInput } = useContext(AppContext);

    const filteredPizzas = pizzas.filter(pizza => pizza.title.toLowerCase().includes(searchInput.toLowerCase()));

    useLayoutEffect(() => {
        window.scrollTo(window.scrollX, 0);
    }, []);

    useEffect(() => {
        setIsLoading(true);

        const url = new URL(`${serverUrl}/items`);
        if (category !== 0) url.searchParams.append('category', category);
        url.searchParams.append('sortBy', sortType.field);
        url.searchParams.append('order', sortType.order);
        // const url = `${serverUrl}/items?${category === 0 ? '' : `category=${category}`}&sortBy=${sortType.field}&order=${sortType.order}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            });
    }, [category, sortType]);

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
                            ? Array(8).fill(null).map((_, idx) => <Skeleton key={idx} />)
                            : filteredPizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
                        }
                    </div>
                )
            }
        </div>
    )
};