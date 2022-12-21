import Wrapper from "../../components/Wrapper";
import {Link} from "react-router-dom";
import Paginator from "../../components/Paginator";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Order} from "../../models/order";
import {OrderItem} from "../../models/order-item";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`orders?page=${page}`);
            setOrders(data.data);
            setLastPage(data.meta.last_page)


        })()
    }, [page]);


    const deleteOrder = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            await axios.delete(`orders/${id}`);
            setOrders(orders.filter((o: Order) => o.id !== id))
        }


    };
    return (<Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to='/orderds/create' className="btn btn-sm btn-outline-secondary"> Add</Link>
        </div>
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order: Order) => {
                    return (
                        <>
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.name} </td>
                                <td>{order.email}</td>
                                <td>{order.total}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <button className="btn btn-sm btn-outline-secondary"> View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5}>
                                    <div>
                                        <table className="table table-sm">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product Title</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {order.order_items.map((item: OrderItem) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.product_title}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </>

                    )
                })}
                </tbody>
            </table>
        </div>
        <Paginator page={page} lastPage={lastPage} pageChanged={page => setPage(page)}/>

    </Wrapper>);
}

export default Orders;