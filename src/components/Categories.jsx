import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export default function Categories() {
    const dispatch = useDispatch();
    const category = useSelector(state => state.filter.category);

    return (
        <div className="categories">
            <ul>
                {categories.map((name, idx) => (
                    <li
                        key={idx}
                        className={category === idx ? 'active' : ''}
                        onClick={() => dispatch(setCategory(idx))}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    )
};