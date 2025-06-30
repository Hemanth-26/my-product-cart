import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Cart from './components/Cart';
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router basename="/my-product-cart">
      <div className="main">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
