import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";
import { setPage } from "../../redux/slices/filterSlice";

import classes from './Pagination.module.scss';

export default function Pagination() {
    const dispatch = useDispatch();

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
            />
        </>
    )
};