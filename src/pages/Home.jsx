import { useState, useEffect, useLayoutEffect } from "react";
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock"

const serverUrl = 'https://666d611e7a3738f7cacc3aa7.mockapi.io';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pizzas, setPizzas] = useState([]);

    useLayoutEffect(() => {
        window.scrollTo(window.scrollX, 0);
    }, []);

    useEffect(() => {
        fetch(`${serverUrl}/items`)
            .then(response => response.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            })
    }, []);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? Array(10).fill(null).map((_, idx) => <Skeleton key={idx} />)
                    : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
                }
            </div>
        </div>
    )
};