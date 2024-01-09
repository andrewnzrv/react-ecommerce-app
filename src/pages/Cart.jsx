import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {

  const handleDeleteAll = () => {
    setCart([]);
  };

  const handleDelete = (index) => {
    setCart((cart) => {
      return cart.filter((_, i) => i !== index);
    });
  };

  const totalPrice = () => {
    return cart.reduce(
      (accumulator, product) => accumulator + product.price,
      0
    );
  };

  return (
    <>
      <h2></h2>
      <button onClick={handleDeleteAll}>Delete all Items</button>
      <div>
        {cart ? (
          <ul>
            {cart.map((product, index) => (
              <div className="cart-grid" key={index}>
                
                <div>
                  <h2>{product.title}</h2>

                  <img
                    className="img-cart"
                    src={product.images[0]}
                    alt={product.title}
                  />
                  <p>
                    Price: {product.price}
                    <span>&#8364;</span>
                  </p>
                  {/* 
              trick -> per passare argomenti agli event handler (dallo scope) 
              */}
                  <button onClick={() => {handleDelete(index);}}>Delete</button>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <h2>
        Subtotal: {totalPrice()}
        <span>&#8364;</span>
      </h2>
      {cart.length != 0 && (
        <Link to="/checkout">
          <button>GO TO CHECKOUT</button>
        </Link>
      )}
    </>
  );
};

export default Cart;
