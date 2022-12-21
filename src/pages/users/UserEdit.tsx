import Wrapper from "../../components/Wrapper";
import {Role} from "../../models/role";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import handleError from "../../api";

function UserEdit() {
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role_id: "",
    });
    const [redirect, setRedirect] = useState(false);
    const params = useParams();


    useEffect(() => {
        (async () => {
                try {
                    const res = await axios.get('/roles');
                    setRoles(res.data);

                    const {data} = await axios.get(`users/${params.id}`);
                    setUser({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        role_id: data.role.id
                    })
                } catch (e) {
                    handleError(e)
                }
            }
        )()
    }, [params.id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.id]: e.target.value})

    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.put(`users/${params.id}`, user);
            setRedirect(true);
        } catch (e) {
            handleError(e)

        }


    };

    if (redirect) {
        return <Navigate to={'/users'}/>;
    }

    return (<Wrapper>
        <form onSubmit={submit}>
            <div className="form-group">
                <label>First Name</label>
                <input id="first_name" type="text" className="form-control"
                       defaultValue={user.first_name}
                       onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input id="last_name" type="text" className="form-control"
                       defaultValue={user.last_name}
                       onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input id="email" type="text" className="form-control"
                       defaultValue={user.email}
                       onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Role</label>
                <select id="role_id" className="form-control"
                        value={user.role_id}
                        onChange={(e) => {
                            setUser({...user, [e.target.id]: e.target.value})
                        }}>
                    <option>Select Role</option>
                    {roles.map(
                        (role: Role) => {
                            return (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            )
                        }
                    )}
                </select>
            </div>

            <button className="btn btn-outline-secondary">Save</button>
        </form>
    </Wrapper>);
}

export default UserEdit;