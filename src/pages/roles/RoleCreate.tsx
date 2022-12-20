import Wrapper from "../../components/Wrapper";
import {Role} from "../../models/role";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {Permission} from "../../models/permission";

function CreateRole() {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number []);
    const [roleName, setRoleName] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
                const {data} = await axios.get('/permissions');
                setPermissions(data)
            }
        )()
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRoleName(e.target.value)
    };

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        axios.post('roles', {name: roleName, permissions: selected}).then(res => {
            if (res.status === 201) {
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

export default CreateRole;