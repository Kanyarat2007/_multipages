import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout/Layout";

import Home from "./pages/Home/Home";
import Calculator from "./pages/Calculator/Calculator";
import Animation from "./pages/Animation/Animation";
import Components from "./pages/Components/Components";
import Todo from "./pages/Todo/Todo";
import Products from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import Login from "./pages/Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

import { fetchProducts } from "./data/products";

function App() {
  const [token, setToken] = useState('x')
  const [role, setRole] = useState('')
  
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()),[])

  useEffect(() => console.log(products), [products])

  if ( token === '' ) {
    return <Login setToken={setToken} setRole={setRole} />
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route element={<Layout products={products} carts={carts} setToken={setToken} />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/animation" element={<Animation />} />
              <Route path="/components" element={<Components />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/products" 
                element={<Products products={products} carts={carts} setCarts={setCarts}/>} />
              <Route path="/carts"
                element={<Carts carts={carts} setCarts={setCarts} />} />
              <Route path="/login" element={<Login /> } /> 
            </Route>
          </Routes>
        </HashRouter>
      </div>  
    );
  }
}

export default App;
