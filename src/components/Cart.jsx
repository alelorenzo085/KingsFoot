import { useRef } from 'react';
import { flushSync } from 'react-dom';
import './Cart.css';
import { ArrowLeftIcon, BagIcon, TrashIcon, LockIcon } from './Icons';

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Cart({ cart, setCart, onBack, onCheckout }) {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const itemRefs = useRef(new Map()); // uid -> row element
  const removing = useRef(new Set()); // uids mid-exit, ignores double clicks

  // Remove one item: slide it out, then let the rows below glide up into the gap (FLIP)
  const removeFromCart = (uid) => {
    if (removing.current.has(uid)) return;
    const commit = () => setCart((prev) => prev.filter((item) => item.uid !== uid));

    const row = itemRefs.current.get(uid);
    if (!row || prefersReducedMotion()) {
      commit();
      return;
    }

    removing.current.add(uid);
    row.style.pointerEvents = 'none';
    const exit = row.animate(
      [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(24px)' },
      ],
      { duration: 180, easing: EASE_OUT, fill: 'forwards' },
    );

    exit.onfinish = () => {
      // First: where every remaining row is now
      const before = new Map();
      itemRefs.current.forEach((node, key) => {
        if (key !== uid) before.set(key, node.getBoundingClientRect().top);
      });

      // Last: remove synchronously so the new layout can be measured
      flushSync(commit);
      removing.current.delete(uid);

      // Invert + Play: start each row where it was and glide to its new spot
      before.forEach((top, key) => {
        const node = itemRefs.current.get(key);
        if (!node) return;
        const dy = top - node.getBoundingClientRect().top;
        if (dy !== 0) {
          node.animate(
            [{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }],
            { duration: 250, easing: EASE_IN_OUT },
          );
        }
      });
    };
  };

  return (
    <div className="cart-page-container view">
      <button className="back-button" onClick={onBack}>
        <ArrowLeftIcon size={16} /> Volver a la tienda
      </button>

      <div className="cart-content">
        <div className="cart-items-section">
          <h2>Tu Carrito de Compra</h2>
          <p className="items-count">Tienes {cart.length} {cart.length === 1 ? 'artículo' : 'artículos'} en tu carrito.</p>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon"><BagIcon size={40} strokeWidth={1.6} /></span>
              <h3>Tu carrito está vacío</h3>
              <button className="continue-shopping" onClick={onBack}>
                Ver camisetas
              </button>
            </div>
          ) : (
            <div className="items-list">
              {cart.map((item) => (
                <div
                  key={item.uid}
                  className="cart-item"
                  ref={(node) => {
                    if (node) itemRefs.current.set(item.uid, node);
                    else itemRefs.current.delete(item.uid);
                  }}
                >
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{item.price}€</p>
                  </div>
                  <button 
                    className="remove-button" 
                    onClick={() => removeFromCart(item.uid)}
                    title="Eliminar artículo"
                    aria-label="Eliminar artículo"
                  >
                    <TrashIcon size={18} />
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
              <LockIcon size={18} /> Pagar ahora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;