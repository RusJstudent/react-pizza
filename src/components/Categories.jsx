import { useContext } from "react"
import { AppContext } from "../context/AppContext";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export default function Categories() {
    const { category, onChangeCategory } = useContext(AppContext);

    return (
        <div className="categories">
            <ul>
                {categories.map((name, idx) => (
                    <li
                        key={idx}
                        className={category === idx ? 'active' : ''}
                        onClick={() => onChangeCategory(idx)}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    )
};