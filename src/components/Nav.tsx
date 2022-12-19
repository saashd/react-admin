import axios from "axios";
import React, {useEffect, useState} from "react";

function Nav() {
    const [user, setUser] = useState({first_name: ""});
    useEffect(() => {
        (async () => {
            const {data} = await axios.get('http://localhost:8000/api/user', {withCredentials: true});
            setUser(data);
        })();
    }, []);

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3 " href="#">Company name</a>


            <ul className="my-2 my-md-0 mr-md-3">
                <a className="-2 text-white text-decoration-none" href="#">{user?.first_name}</a>
                <a className="-2 text-white text-decoration-none" href="#">Sign out</a>
            </ul>

        </nav>
    );

}

export default Nav;