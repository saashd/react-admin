import React from "react";

function Paginator(props: { page: number, lastPage: number, pageChanged: (page: number) => void }) {
    const previous = () => {
        props.pageChanged(props.page - 1 >= 1 ? props.page - 1 : 1)

    };
    const next = () => {
        props.pageChanged(props.page + 1 <= props.lastPage ? props.page + 1 : props.lastPage)
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" onClick={previous}>Previous</button>
                </li>

                <li className="page-item">
                    <button className="page-link" onClick={next}>Next</button>
                </li>
            </ul>
        </nav>);

}

export default Paginator;