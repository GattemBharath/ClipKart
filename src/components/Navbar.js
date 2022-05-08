import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { CartContext } from "../Global/CartContext";
import { ShoppingCart } from "@mui/icons-material";

const Navbar = () => {
  const { qty } = useContext(CartContext);

  return (
    <nav>
      <ul className="left">
        <li>
          <Link to="/">ClipKart</Link>
        </li>
      </ul>
      <ul className="right">
        <li>
          <Link to="cart">
            <span className="cart">
              <ShoppingCartIcon className="icon" style={{ color: "black" }} />
              <span className="cartCount">{qty}</span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
