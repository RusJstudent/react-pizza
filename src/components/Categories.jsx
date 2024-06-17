import { HomeContext } from "../context/HomeContext";
import { useContext } from "react"

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export default function Categories() {
    const { category, onChangeCategory } = useContext(HomeContext);

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