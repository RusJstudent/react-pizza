import ReactPaginate from "react-paginate";
import classes from './Pagination.module.scss';

export default function Pagination({ onChange }) {
    return (
        <>
            <ReactPaginate
                className={classes.root}
                breakLabel="..."
                previousLabel="<"
                nextLabel=">"
                onPageChange={obj => onChange(obj.selected + 1)}
                pageRangeDisplayed={8}
                pageCount={2}
                renderOnZeroPageCount={null}
            />
        </>
    )
};