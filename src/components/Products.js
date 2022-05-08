import React, { useContext, useState } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import Banner from "./Banner";
import { CartContext } from "../Global/CartContext";

const Products = () => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);

  // const [add, setadd] = useState(false);
  // const [cart, setCart] = useState([]);

  // const addToCart = (event, prod) => {
  //   event.preventDefault();

  //   setadd(true);
  //   setCart(prod);
  //   setTimeout(() => {
  //     setadd(false);
  //   }, 1000);
  // };
  return (
    <div className="container">
      <Banner />
      <h1 className="prod">Our Products</h1>
      <div className="line"></div>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <div className="product-price">₹{product.price}</div>
            </div>

            <button
              className="addtocart"
              // disabled={add}
              onClick={(e, prod) => {
                // addToCart(e, prod);
                dispatch({
                  type: "ADD_TO_CART",
                  id: product.id,
                  product,
                });
              }}
            >
              {/* {add ? "ADDED" : "add to cart"} */}
              add to cart
            </button>
            {product.status === "hot" ? <div className="hot">Hot</div> : ""}
            {product.status === "new" ? <div className="new">New</div> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
