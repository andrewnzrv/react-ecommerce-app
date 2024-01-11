import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mantine/core";

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
      <Box maw={1020} mx="auto">
        {cart.length ? (
          <div className="cart-content">
            <div className="cart-preview">
              <h2>You cart ({cart.length} items)</h2>

              <div className="cart">
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
                          className="cart-remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="total-price">
              <h2>Total</h2>
              <div className="price-content">
                <div className="price-titles">
                  <p>Subtotal</p>
                  <p>Delivery:</p>
                  <p>
                    <b>Total (Vat included)</b>
                  </p>
                </div>
                <div className="price-values">
                  <p>{totalPrice()} €</p>
                  <p>free</p>
                  <p>{totalPrice()} €</p>
                </div>
              </div>
              {cart.length != 0 && (
                <Link to="/checkout">
                  <Button
                    className="detail-button"
                    variant="filled"
                    type="button"
                  >
                    GO TO CHECKOUT
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-card">
            <h2>Your cart is empty</h2>
            <Link to="/product">
              <Button onClick={() => setCart([])}>Find more products</Button>
            </Link>
          </div>
        )}
      </Box>
    </>
  );
};

export default Cart;
