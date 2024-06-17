import { useState, useEffect, useLayoutEffect } from "react";
import { HomeContext } from "../context/HomeContext";
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock"

const serverUrl = 'https://666d611e7a3738f7cacc3aa7.mockapi.io';

const sortTypes = [
    {name: 'популярности', field: 'rating', order: 'desc'},
    {name: 'цене 🠅', field: 'price', order: 'asc'},
    {name: 'цене 🠇', field: 'price', order: 'desc'},
    {name: 'алфавиту', field: 'title', order: 'asc'},
];

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pizzas, setPizzas] = useState([]);
    const [category, setCategory] = useState(0);
    const [sortType, setSortType] = useState(sortTypes[0]);

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

    function onChangeCategory(idx) {
        setCategory(idx);
    }

    function onChangeSortType(type) {
        setSortType(type);
    }

    return (
        <HomeContext.Provider value={{ category, sortType, onChangeCategory, onChangeSortType }}>
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort sortTypes={sortTypes} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? Array(8).fill(null).map((_, idx) => <Skeleton key={idx} />)
                        : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
                    }
                </div>
            </div>
        </HomeContext.Provider>
    )
};