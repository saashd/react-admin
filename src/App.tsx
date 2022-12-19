import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={'/'} element={<Dashboard/>}/>
                    <Route path={'/users'} element={<Users/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
