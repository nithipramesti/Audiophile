import "./assets/styles/css/main.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";

function App() {
  return (
    <div className="app">
      <Navbar />
      <ProductDetail />
      <Footer />
    </div>
  );
}

export default App;
