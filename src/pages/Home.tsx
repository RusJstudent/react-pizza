import { useEffect, useLayoutEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchPizzas } from "../redux/pizzas/slice";
import { RootState, useAppDispatch } from "../redux/store";
import qs from 'qs';

import { Categories, Sort, Skeleton, PizzaBlock, NotFoundBlock, Pagination } from '../components';

/* Альтернативный, но менее удобный способ использования параметров поиска в url:
    const url = `${serverUrl}/items?${category === 0 ? '' : `category=${category}`}&sortBy=${sortType.field}&order=${sortType.order}`; 
*/

export const serverUrl = 'https://666d611e7a3738f7cacc3aa7.mockapi.io';
const limit = 8;

export default function Home() {
    const { items, isLoading } = useSelector((state: RootState) => state.pizzas);
    const { category, sortType, page, searchValue } = useSelector((state: RootState) => state.filter);

    const dispatch = useAppDispatch();
    const navigave = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo(window.scrollX, 0);
    }, [category, sortType, page]);

    useEffect(() => {
        const url = new URL(`${serverUrl}/items`);
        if (category !== '0') url.searchParams.append('category', String(category));
        url.searchParams.append('sortBy', sortType.field);
        url.searchParams.append('order', sortType.order);
        url.searchParams.append('page', String(page));
        url.searchParams.append('limit', String(limit));
        if (searchValue) url.searchParams.append('search', searchValue); /* Warning: в mockApi не работает фильтрация по category и по search одновременно */

        dispatch(fetchPizzas(url.href));
    }, [category, sortType, page, searchValue]);

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
                ? <NotFoundBlock content={<span>К сожалению, не удалось получить питсы. <br />Попробуйте повторить попытку позже.</span>} />
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