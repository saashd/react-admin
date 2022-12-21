import axios from "axios";
import React, {useEffect, useState} from "react";
import Wrapper from "../../components/Wrapper";
import {User} from "../../models/user";
import {Link} from "react-router-dom";
import Paginator from "../../components/Paginator";
import handleError from "../../api";

function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (async () => {
              try {
                  const {data} = await axios.get(`users?page=${page}`);
                  setUsers(data.data);
                  setLastPage(data.meta.last_page)

        } catch (e) {
            handleError(e)

        }

        })()
    }, [page]);


    const deleteUser = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
              try {
                  await axios.delete(`users/${id}`);
                  setUsers(users.filter((u: User) => u.id !== id))
        } catch (e) {
            handleError(e)

        }

        }


    };

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to='/users/create' className="btn btn-sm btn-outline-secondary"> Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: User) => {
                        return (<tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role.name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/users/${user.id}/edit`}
                                              className="btn btn-sm btn-outline-secondary"> Edit</Link>
                                        <button className="btn btn-sm btn-outline-secondary"
                                                onClick={() => deleteUser(user.id)}> Delete
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

        </Wrapper>
    );

}

export default Users;