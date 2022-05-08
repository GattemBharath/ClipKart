import "./App.css";

import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductsContextProvider from "./Global/ProductsContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import CartContextProvider from "./Global/CartContext";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <ProductsContextProvider>
        <CartContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Products />} />
              <Route path="/cart" exact element={<Cart />} />
              <Route path="*" exact element={<NotFound />} />
            </Routes>
          </Router>
          <Footer />
        </CartContextProvider>
      </ProductsContextProvider>
    </div>
  );
}

export default App;
