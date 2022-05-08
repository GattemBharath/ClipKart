import React from "react";

const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, qty } = state;
  let product;
  let index;
  let updatedPrice;
  let updatedQty;

  switch (action.type) {
    case "ADD_TO_CART":
      const check = shoppingCart.find((product) => product.id === action.id);
      if (check) {
        return state;
      } else {
        product = action.product;
        product["qty"] = 1;
        updatedQty = qty + 1;
        updatedPrice = totalPrice + product.price;
        return {
          shoppingCart: [...shoppingCart, product],
          totalPrice: updatedPrice,
          qty: updatedQty,
        };
      }
      break;

    case "INC":
      console.log("INCREMENT");
      product = action.cart;
      product.qty = product.qty + 1;
      updatedPrice = totalPrice + product.price;
      updatedQty = qty + 1;
      index = shoppingCart.findIndex((cart) => cart.id === action.id);
      shoppingCart[index] = product;
      console.log(updatedQty, updatedPrice);
      return {
        shoppingCart: [...shoppingCart],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };
      break;

    case "DEC":
      console.log("DECREMENT");
      product = action.cart;
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        updatedPrice = totalPrice - product.price;
        updatedQty = qty - 1;
        index = shoppingCart.findIndex((cart) => cart.id === action.id);
        shoppingCart[index] = product;
        console.log(product, totalPrice);
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatedPrice,
          qty: updatedQty,
        };
      } else {
        return state;
      }
      break;

    case "DELETE":
      console.log("DELETED");
      const filtered = shoppingCart.filter(
        (product) => product.id !== action.id
      );
      product = action.cart;
      updatedQty = qty - product.qty;
      updatedPrice = totalPrice - product.price * product.qty;
      return {
        shoppingCart: [...filtered],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };
      break;

    case "EMPTY":
      return { shoppingCart: [], totalPrice: 0, qty: 0 };

    default:
      return state;
  }
};

export default CartReducer;
