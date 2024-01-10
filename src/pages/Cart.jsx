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
      {/*<button onClick={handleDeleteAll}>Remove all Items</button>*/}
      <div className="product-detail">
        <h2>You cart</h2>

        <div className="cart">
          {cart ? (
            <ul>
              {cart.map((product, index) => (
                <div className="cart-grid" key={index}>
                  <div>
                    <img
                      className="img-cart"
                      src={product.images[0]}
                      alt={product.title}
                    />
                  </div>
                  <div className="product-info-cart">
                    <p>{product.title}</p>
                    <p>{product.price} €</p>
                    {/* 
              trick -> per passare argomenti agli event handler (dallo scope) 
              */}
                    <button
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <h2>Total price: {totalPrice()} €</h2>
        {cart.length != 0 && (
          <Link to="/checkout">
            <button>GO TO CHECKOUT</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Cart;
