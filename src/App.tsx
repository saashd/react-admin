import React from 'react';
import './App.css';
import Users from "./pages/users/Users";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserCreate from './pages/users/UserCreate';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>

                    <Route path={'/'} element={<Dashboard/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/users'} >
                         <Route index={true} element={<Users />}/>
                        <Route path={'/users/create'} element={<UserCreate/>}/>
                    </Route>


                </Routes>
            </Router>
        </div>
    );
}

export default App;
