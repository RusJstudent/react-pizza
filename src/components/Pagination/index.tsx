import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/filter/slice";
import { RootState } from "../../redux/store";

import classes from './Pagination.module.scss';

export default function Pagination() {
    const dispatch = useDispatch();
    const { page } = useSelector((state: RootState) => state.filter);

    return (
        <>
            <ReactPaginate
                className={classes.root}
                breakLabel="..."
                previousLabel="<"
                nextLabel=">"
                onPageChange={obj => dispatch(setPage(String(obj.selected + 1)))}
                pageRangeDisplayed={8}
                pageCount={2}
                renderOnZeroPageCount={null}
                forcePage={Number(page) - 1}
            />
        </>
    )
};