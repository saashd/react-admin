import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Nav/>
                <div className="container-fluid">
                    <div className="row">
                        <Menu/>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <Routes>
                                <Route path={'/'} element={<Dashboard/>}/>
                                <Route path={'/users'} element={<Users/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
