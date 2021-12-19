import "./assets/styles/css/main.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Import component for Route
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Home />} exact path="/" />
        <Route element={<Products />} exact path="/categories/:category" />
        <Route element={<ProductDetail />} exact path="/products/:id_product" />
        <Route element={<Checkout />} exact path="/checkout" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
