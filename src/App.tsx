import React from 'react';
import './App.css';
import Users from "./pages/users/Users";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserCreate from './pages/users/UserCreate';
import UserEdit from "./pages/users/UserEdit";
import Roles from './pages/roles/Roles';
import RoleCreate from './pages/roles/RoleCreate';
import RoleEdit from './pages/roles/RoleEdit';
import Products from "./pages/products/Products";
import ProductCreate from './pages/products/ProductCreate';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>

                    <Route path={'/'} element={<Dashboard/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/users'}>
                        <Route index={true} element={<Users/>}/>
                        <Route path={'/users/create'} element={<UserCreate/>}/>
                        <Route path={'/users/:id/edit'} element={<UserEdit/>}/>
                    </Route>
                    <Route path={'/roles'}>
                        <Route index={true} element={<Roles/>}/>
                        <Route path={'/roles/create'} element={<RoleCreate/>}/>
                        <Route path={'/roles/:id/edit'} element={<RoleEdit/>}/>
                    </Route>
                    <Route path={'/products'}>
                        <Route index={true} element={<Products/>}/>
                        <Route path={'/products/create'} element={<ProductCreate/>}/>
                        {/*<Route path={'/products/:id/edit'} element={<ProductEdit/>}/>*/}
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
