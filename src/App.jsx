import { useState } from 'react';
import './App.css';
import Cart from './components/Cart';
import Pay from './components/Pay'; // Import the payment view

const MOCK_PRODUCTS = [
  { id: 1, name: 'Real Madrid FC 26/27 Local', price: 95, tag: 'TOP VENTAS', image: 'https://us.shop.realmadrid.com/cdn/shop/files/RMCFMZ0941_01-LIGA.jpg?v=1779891682&width=1920' },
  { id: 2, name: 'FC Barcelona FC 26/27 Local', price: 95, tag: 'NUEVO', image: 'https://cdn.media.amplience.net/i/frasersdev/37727608_o?fmt=auto&upscale=false&w=1200&h=1200&v=20260615181158&sm=scaleFit&$h-ttl$' },
  { id: 3, name: 'Selección Española Mundial 2026', price: 110, tag: 'EDICIÓN LIMITADA', image: 'https://clockerslab.com/storage/2026/07/ChatGPT-Image-21-jul-2026_-22_52_08.webp' },
  { id: 4, name: 'Manchester City FC 26/27', price: 90, tag: '', image: 'https://media.futbolmania.com/media/catalog/product/cache/1/image/0f330055bc18e2dda592b4a7c3a0ea22/7/8/784326-01_camiseta-color-azul-puma-manchester-city-26-27_1_completa-frontal.jpg' },
  { id: 5, name: 'Arsenal FC 26/27 Local', price: 85, tag: 'NUEVO', image: 'https://assets.footlocker.com/is/image/FLDM/317140335630_07?fmt=webp-alpha&bfc=on&wid=500&hei=500' },
  { id: 6, name: 'Bayern Munich FC 26/27', price: 80, tag: '', image: 'https://img.fcbayern.com/image/upload/q_auto,f_auto/w_800,h_1067,c_pad/eCommerce/produkte/54804_4' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'cart', or 'pay'

  // Add a selected product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo" onClick={() => setCurrentView('home')}>
          <h1><span>⚽</span> KingsFoot</h1>
        </div>
        <div className="cart-widget" onClick={() => setCurrentView('cart')}>
          <span className="cart-icon">🛒</span>
          <div className="cart-info">
            <span className="cart-count">{cart.length} {cart.length === 1 ? 'artículo' : 'artículos'}</span>
            <span className="cart-total">{totalPrice}€</span>
          </div>
        </div>
      </header>

      {/* CONDITIONAL RENDERING */}
      {currentView === 'home' && (
        <>
          <section className="hero">
            <div className="hero-content">
              <h2>VÍSTETE COMO DEBE SER</h2>
              <p>Descubre los últimos lanzamientos de la nueva temporada 26/27</p>
            </div>
          </section>

          <main className="main-content">
            <div className="section-header">
              <h3 className="section-title">Lo último en ventas</h3>
              <span className="subtitle">Explora nuestra colección</span>
            </div>
            
            <div className="products-grid">
              {MOCK_PRODUCTS.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="image-container">
                    {product.tag && <span className="product-tag">{product.tag}</span>}
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <div className="purchase-area">
                      <p className="price">{product.price}€</p>
                      <button 
                        className="add-button"
                        onClick={() => addToCart(product)}
                      >
                        Añadir +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      )}

      {currentView === 'cart' && (
        <Cart 
          cart={cart} 
          setCart={setCart} 
          onBack={() => setCurrentView('home')} 
          onCheckout={() => setCurrentView('pay')} // Pass the function to navigate to payment
        />
      )}

      {currentView === 'pay' && (
        <Pay 
          totalPrice={totalPrice} 
          onBack={() => setCurrentView('cart')} 
          onFinish={() => {
            setCart([]); // Empty the cart after payment
            setCurrentView('home');
          }}
        />
      )}
    </div>
  );
}

export default App;