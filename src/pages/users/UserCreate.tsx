import Wrapper from "../../components/Wrapper";
import {Role} from "../../models/role";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import handleError from "../../api";

function CreateUser() {
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role_id: "",
    });
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
                try {
                    const {data} = await axios.get('/roles');
                    setRoles(data)
                } catch (e) {
                    handleError(e)

                }
            }
        )()
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.id]: e.target.value})

    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('users', user);
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
                       onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input id="last_name" type="text" className="form-control"
                       onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input id="email" type="text" className="form-control"
                       onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Role</label>
                <select id="role_id" className="form-control"
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

export default CreateUser;