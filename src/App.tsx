import React from 'react';
import './App.css';
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={'/'} element={<Dashboard/>}/>
                    <Route path={'/users'} element={<Users/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
