import Wrapper from "../../components/Wrapper";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import {Permission} from "../../models/permission";

function RoleEdit() {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number []);
    const [roleName, setRoleName] = useState("");
    const [redirect, setRedirect] = useState(false);
    const params = useParams();
    let id = params.id;

    useEffect(() => {
        (async () => {
                const res = await axios.get('/permissions');
                setPermissions(res.data);

                const {data} = await axios.get(`roles/${id}`);
                setRoleName(data.name);
                setSelected(data.permissions.map((p: Permission) => p.id));

            }
        )()
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRoleName(e.target.value)
    };

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        axios.put(`roles/${id}`, {name: roleName, permissions: selected}).then(res => {
            if (res.status === 202) {
                setRedirect(true);
            }
        }).catch((err) => {
            console.log(err)

        })
    };

    const check = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }
        setSelected([...selected, id]);
    };


    if (redirect) {
        return <Navigate to={'/roles'}/>;
    }

    return (<Wrapper>
        <form onSubmit={submit}>
            <div className="form-group">
                <label>Name</label>
                <input id="name" type="text" className="form-control"
                       defaultValue={roleName}
                       onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="cil-sm-2 col-form-label">Permissions</label>
                <div className="col-sm-10">
                    {permissions.map((perm: Permission) => {
                        return (
                            <div className="form-check form-check-inline col-3" key={perm.id}>
                                <input className="form-check-input" type="checkbox"
                                       value={perm.id}
                                       checked={selected.some(s => s === perm.id)}
                                       onChange={() => check(perm.id)}/>
                                <label className="form-check-label">{perm.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>

            <button className="btn btn-outline-secondary">Save</button>
        </form>
    </Wrapper>);
}

export default RoleEdit;