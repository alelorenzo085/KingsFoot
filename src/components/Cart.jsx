import React from 'react';
import './Cart.css';

function Cart({ cart, setCart, onBack, onCheckout }) {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Remove one item from the cart by its index
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="cart-page-container">
      <button className="back-button" onClick={onBack}>
        &larr; Volver a la tienda
      </button>

      <div className="cart-content">
        <div className="cart-items-section">
          <h2>Tu Carrito de Compra</h2>
          <p className="items-count">Tienes {cart.length} {cart.length === 1 ? 'artículo' : 'artículos'} en tu carrito.</p>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon">😢</span>
              <h3>Tu carrito está vacío</h3>
              <button className="continue-shopping" onClick={onBack}>
                Ver camisetas
              </button>
            </div>
          ) : (
            <div className="items-list">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{item.price}€</p>
                  </div>
                  <button 
                    className="remove-button" 
                    onClick={() => removeFromCart(index)}
                    title="Eliminar artículo"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order summary (right sidebar) */}
        {cart.length > 0 && (
          <div className="cart-summary-section">
            <h3>Resumen del pedido</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{totalPrice}€</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{totalPrice}€</span>
            </div>
            <button className="checkout-button" onClick={onCheckout}>
              Pagar ahora 🔒
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;