import React, { useContext } from "react";
import { CartContext } from "../Global/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

toast.configure();

const Cart = (props) => {
  const navigate = useNavigate();
  const { shoppingCart, totalPrice, qty, dispatch } = useContext(CartContext);
  // console.log(qty);

  const handleToken = async (token) => {
    // console.log(token);
    const product = { name: "All Products", price: totalPrice };
    const res = await axios.post("http://localhost:8080/checkout", {
      product,
      token,
    });
    const { status } = res.data;

    if (status === "success") {
      dispatch({ type: "EMPTY" });
      navigate(-1);
      // props.history.push("/");
      toast.success("Payment is Successfull 🎉🎉!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="cart-container">
      <div className="cart-datails" style={{ marginTop: "100px" }}>
        {shoppingCart.length > 0 ? (
          shoppingCart.map((cart) => (
            <div className="cart-page" key={cart.id}>
              <span className="cart-image">
                <img src={cart.image} alt={cart.name} />
              </span>
              <span className="cart-product-name">{cart.name}</span>
              <span className="cart-product-price">₹{cart.price}</span>
              <span
                className="inc"
                onClick={() => dispatch({ type: "INC", id: cart.id, cart })}
              >
                <AddIcon />
              </span>
              <span className="cart-qty">{cart.qty}</span>
              <span
                className="dec"
                onClick={() => dispatch({ type: "DEC", id: cart.id, cart })}
              >
                <RemoveIcon />
              </span>
              <span className="cart-price">₹{cart.price * cart.qty}</span>
              <span
                className="cart-del"
                onClick={() => dispatch({ type: "DELETE", id: cart.id, cart })}
              >
                <DeleteIcon />
              </span>
            </div>
          ))
        ) : (
          <div className="empty">Sorry Your Cart is Currently Empty</div>
        )}
      </div>
      {shoppingCart.length > 0 ? (
        <div className="cart-summary">
          <div className="summary">
            <h3>Cart Summary</h3>
            <div className="total-items">
              <div className="items">Total Items</div>
              <div className="items-count">{qty}</div>
            </div>
            <div className="total-price">
              <div className="just-title">Total Price</div>
              <div className="items-price">₹{totalPrice}.00</div>
            </div>
            <div className="stripe-section">
              <StripeCheckout
                stripeKey="pk_test_51KwhLkSDXKb6ZzGpEEcwWlBZDVzSNiUoXYQec6YIksGRswsZUm9yvR7cPTMJszD6tH44c6oL7gFP1crYO6awKWHT00MUEluVa5"
                token={handleToken}
                billingAddress
                shippingAddress
                amount={totalPrice * 100}
                name="All Products"
              ></StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
