import { useState } from "react"

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export default function Categories() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="categories">
            <ul>
                {categories.map((category, idx) => (
                    <li
                        key={idx}
                        className={activeIndex === idx ? 'active' : ''}
                        onClick={() => setActiveIndex(idx)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
};