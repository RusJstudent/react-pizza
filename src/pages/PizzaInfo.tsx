import { useState, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IPizza } from "../redux/pizzas/types";

import { serverUrl } from "./Home";

export default function PizzaInfo() {
    const [pizza, setPizza] = useState<IPizza>();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${serverUrl}/items/${id}`)
            .then(response => {
                setPizza(response.data);
            })
            .catch(err => {
                alert('Ошибка при получении пиццы..');
                navigate('/');
            })
    }, []);

    if (!pizza) {
        return (
            <div className="container">
                <h2 className="content__title">Загрузка...</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="content__title">Пицца</h2>
            <div style={{ margin: '0 auto', textAlign: 'center', marginTop: 40, paddingBottom: 15 }}>
                <h3 style={{ fontSize: 35, marginBottom: 20 }}>{pizza.title}</h3>
                <div style={{ maxWidth: 350, margin: '0 auto 30px' }}>
                    <img style={{ width: '100%', marginRight: -12 }} src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg" alt="pizza" />
                    <div style={{ textAlign: 'center', fontSize: 30 }}>
                        <span>Цена: </span>
                        <b>{pizza.price} ₽</b>
                    </div>
                </div>
                <Link to="/" className="button button--outline button--add go-back-btn">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span>Вернуться назад</span>
                </Link>
            </div>
        </div>
    )
};