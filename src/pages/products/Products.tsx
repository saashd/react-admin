import {Link} from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../../models/product";

function Products() {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
                const {data} = await axios.get(`products?page=${page}`);
                setProducts(data.data);
                setLastPage(data.meta.last_page)
            }
        )()
    }, [page]);

    const deleteProduct = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            await axios.delete(`products/${id}`);
            setProducts(products.filter((p: Product) => p.id !== id))
        }
    };

    const previous = () => {
        setPage(page - 1 >= 1 ? page - 1 : 1)

    };
    const next = () => {
        setPage(page + 1 <= lastPage ? page + 1 : lastPage)
    };

    return (<Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to='/roles/create' className="btn btn-sm btn-outline-secondary"> Add</Link>
        </div>
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product: Product) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td><img src={product.image} width={"50"} alt={""}/></td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <div className="btn-group mr-2">
                                    <Link to={`/products/${product.id}/edit`}
                                          className="btn btn-sm btn-outline-secondary"> Edit</Link>
                                    <button className="btn btn-sm btn-outline-secondary"
                                            onClick={() => deleteProduct(product.id)}> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        </div>
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" onClick={previous}>Previous</button>
                </li>

                <li className="page-item">
                    <button className="page-link" onClick={next}>Next</button>
                </li>
            </ul>
        </nav>
    </Wrapper>);

}

export default Products;