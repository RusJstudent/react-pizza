import { useEffect, useLayoutEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import qs from 'qs';

import { AppContext } from "../context/AppContext";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import NotFoundBlock from "../components/NotFoundBlock";
import Pagination from "../components/Pagination";

/* Альтернативный, но менее удобный способ использования параметров поиска в url:
    const url = `${serverUrl}/items?${category === 0 ? '' : `category=${category}`}&sortBy=${sortType.field}&order=${sortType.order}`; 
*/

const serverUrl = 'https://666d611e7a3738f7cacc3aa7.mockapi.io';
const limit = 8;

export default function Home() {
    const { searchInput } = useContext(AppContext);

    const { items, isLoading } = useSelector(state => state.pizzas);
    const { category, sortType, page } = useSelector(state => state.filter);

    const dispatch = useDispatch();
    const navigave = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo(window.scrollX, 0);
    }, [category, sortType, page]);

    useEffect(() => {
        const url = new URL(`${serverUrl}/items`);
        if (category !== 0) url.searchParams.append('category', category);
        url.searchParams.append('sortBy', sortType.field);
        url.searchParams.append('order', sortType.order);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);
        if (searchInput) url.searchParams.append('search', searchInput); /* Warning: в mockApi не работает фильтрация по category и по search одновременно */

        dispatch(fetchPizzas(url));
    }, [category, sortType, page, searchInput]);

    useEffect(() => {
        const queryString = qs.stringify({
            sortType,
            category,
            page,
        });

        navigave(`?${queryString}`);
    }, [category, sortType, page]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {!isLoading && !items.length
                ? <NotFoundBlock text={<span>К сожалению, не удалось получить питсы. <br />Попробуйте повторить попытку позже.</span>} />
                : (
                    <div className="content__items">
                        {isLoading
                            ? Array(limit).fill(null).map((_, idx) => <Skeleton key={idx} />)
                            : items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
                        }
                    </div>
                )
            }
            <Pagination />
        </div>
    )
};