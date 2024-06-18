const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export default function Categories({ category, onChange }) {
    return (
        <div className="categories">
            <ul>
                {categories.map((name, idx) => (
                    <li
                        key={idx}
                        className={category === idx ? 'active' : ''}
                        onClick={() => onChange(idx)}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    )
};