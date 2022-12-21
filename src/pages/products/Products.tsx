import {Link} from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../../models/product";
import Paginator from "../../components/Paginator";
import handleError from "../../api";

function Products() {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
                try {
                    const {data} = await axios.get(`products?page=${page}`);
                    setProducts(data.data);
                    setLastPage(data.meta.last_page)
                } catch (e) {
                    handleError(e)

                }


            }
        )()
    }, [page]);

    const deleteProduct = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`products/${id}`);
                setProducts(products.filter((p: Product) => p.id !== id))
            } catch (e) {
                handleError(e)
            }
        }
    };

    return (<Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to='/products/create' className="btn btn-sm btn-outline-secondary"> Add</Link>
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
        <Paginator page={page} lastPage={lastPage} pageChanged={page => setPage(page)}/>

    </Wrapper>);

}

export default Products;