import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/filter/slice";
import { RootState } from "../redux/store";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export default memo(function Categories() {
    const dispatch = useDispatch();
    const category = useSelector((state: RootState) => state.filter.category);

    return (
        <div className="categories">
            <ul>
                {categories.map((name, idx) => (
                    <li
                        key={idx}
                        className={category === String(idx) ? 'active' : ''}
                        onClick={() => dispatch(setCategory(String(idx)))}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    )
});