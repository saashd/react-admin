import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import '../Login.css'
import axios from "axios";

function Register() {
    const [state, setState] = useState({firstName: "", lastName: "", email: "", password: "", passwordConfirm: ""})
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.id]: e.target.value})

    };
    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
            password: state.password,
            password_confirm: state.passwordConfirm
        }
        axios.post('http://localhost:8000/api/register', data).then(res => {
            console.log(res)

        }).catch((err) => {

        })

    };

    return (<div>
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input id="firstName" type="text" className="form-control" placeholder="First Name" required
                       onChange={handleChange}/>
                <input id="lastName" type="text" className="form-control" placeholder="Last Name" required
                       onChange={handleChange}/>
                <input id="email" type="email" className="form-control" placeholder="name@example.com" required
                       onChange={handleChange}/>
                <input id="password" type="password" className="form-control" placeholder="Password" required
                       onChange={handleChange}/>
                <input id="passwordConfirm" type="password" className="form-control" placeholder="Password Confirtm"
                       required
                       onChange={handleChange}/>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

            </form>
        </main>
    </div>);

}

export default Register;