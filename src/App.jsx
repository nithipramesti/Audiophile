import "./assets/styles/css/main.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Checkout />
      <Footer />
    </div>
  );
}

export default App;
