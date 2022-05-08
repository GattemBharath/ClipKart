import { Watch } from "@mui/icons-material";
import React, { createContext, useState } from "react";

import dslr from "../assets/dslr.jpg";
import hp from "../assets/headphones.jpg";
import iphone from "../assets/iphone.jpg";
import mp from "../assets/microphone.jpg";
import perfume from "../assets/perfume.jpg";
import shoes from "../assets/shoes.jpg";
import rings from "../assets/rings.jpg";
import watch from "../assets/watch.jpg";

export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([
    { id: 1, name: "Dslr", price: 4000, image: dslr, status: "hot" },
    { id: 2, name: "Head Phones", price: 2000, image: hp, status: "new" },
    { id: 3, name: "iphone", price: 50000, image: iphone, status: "hot" },
    { id: 4, name: "Micro Phone", price: 1000, image: mp, status: "hot" },
    { id: 5, name: "Perfume", price: 300, image: perfume, status: "new" },
    { id: 6, name: "Shoes", price: 1500, image: shoes, status: "hot" },
    { id: 7, name: "Rings", price: 900, image: rings, status: "hot" },
    { id: 8, name: "Watch", price: 4000, image: watch, status: "new" },
  ]);

  return (
    <ProductsContext.Provider value={{ products: [...products] }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
