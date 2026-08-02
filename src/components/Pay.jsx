import React, { useState } from 'react';
import './Pay.css';

function Pay({ totalPrice, onBack, onFinish }) {
  // Separate state for each form field
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  // Card-related state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardBrand, setCardBrand] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Format the card number and detect the card brand while typing
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Numbers only
    if (value.length > 16) value = value.slice(0, 16); // Maximum 16 digits
    
    // Apply format XXXX XXXX XXXX XXXX
    let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);

    // Card brand detection
    if (/^4/.test(value)) {
      setCardBrand('VISA');
    } else if (/^5[1-5]|^2[2-7]/.test(value)) {
      setCardBrand('MasterCard');
    } else if (/^3[47]/.test(value)) {
      setCardBrand('American Express');
    } else {
      setCardBrand('');
    }
  };

  // Format the expiry date as MM/YY automatically
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setExpiry(value);
  };

  // Validate the card number with the Luhn algorithm
  const isValidLuhn = (numStr) => {
    const cleanStr = numStr.replace(/\s+/g, '');
    if (cleanStr.length < 13 || cleanStr.length > 19) return false;
    
    const digits = cleanStr.split('').map(Number);
    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Check whether the expiry date is still valid
  const validateExpiry = (expiryStr) => {
    const parts = expiryStr.split('/');
    if (parts.length !== 2) return false;
    
    const month = parseInt(parts[0], 10);
    const year = parseInt('20' + parts[1], 10);

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;

    const currentYear = 2026;
    const currentMonth = 8;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  };

  // Handle the payment submission and simulate a successful payment
  const handlePayment = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateExpiry(expiry)) {
      setErrorMsg('❌ Error: La tarjeta está caducada o la fecha introducida es anterior a la actual.');
      return;
    }

    if (!isValidLuhn(cardNumber)) {
      setErrorMsg('❌ Error: El número de tarjeta introducido es falso o inválido.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onFinish();
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="pay-container success-view">
        <div className="success-card">
          <h2>¡Pago completado con éxito! 🎉</h2>
          <p>Tu tarjeta ha sido verificada correctamente. ¡Pedido en camino!</p>
          <p className="redirect-text">Redirigiendo al inicio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pay-container">
      <button className="back-button" onClick={onBack}>
        &larr; Volver al carrito
      </button>

      <div className="pay-content">
        <div className="pay-form-section">
          <h2>Finalizar Compra</h2>
          <p className="pay-subtitle">Introduce tus datos de envío y pago de forma segura.</p>

          {errorMsg && <div className="error-alert">{errorMsg}</div>}

          <form onSubmit={handlePayment} className="payment-form">
            
            {/* BLOCK 1: SHIPPING INFORMATION */}
            <div className="form-section-title">📦 Shipping Information</div>

            <div className="form-group">
              <label>Nombre completo</label>
              <input 
                type="text" 
                placeholder="Ej: Lamine Yamal" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label>Correo electrónico</label>
                <input 
                  type="email" 
                  placeholder="Ej: lamine@yamal.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group half">
                <label>Teléfono</label>
                <input 
                  type="tel" 
                  placeholder="Ej: +34 600 123 456" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Dirección de envío</label>
              <input 
                type="text" 
                placeholder="Ej: Calle Falsa 123, 2ºB" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Ciudad</label>
                <input 
                  type="text" 
                  placeholder="Ej: Barcelona" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group half">
                <label>Código postal</label>
                <input 
                  type="text" 
                  placeholder="Ej: 08001" 
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>País</label>
              <input 
                type="text" 
                placeholder="Ej: España" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required 
              />
            </div>

            {/* BLOCK 2: PAYMENT INFORMATION */}
            <div className="form-section-title">💳 Payment Details</div>

            <div className="form-group">
              <label>Nombre en la tarjeta</label>
              <input 
                type="text" 
                placeholder="Ej: Lamine Yamal" 
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <div className="label-with-brand">
                <label>Número de tarjeta</label>
                {cardBrand && <span className={`card-badge ${cardBrand.toLowerCase()}`}>{cardBrand}</span>}
              </div>
              <input 
                type="text" 
                placeholder="XXXX XXXX XXXX XXXX" 
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength="19" 
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Fecha de caducidad</label>
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength="5" 
                  required 
                />
              </div>
              <div className="form-group half">
                <label>CVV</label>
                <input 
                  type="password" 
                  placeholder="123" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  maxLength="3" 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`pay-submit-button ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Verificando con el banco...' : `Pagar ${totalPrice}€`}
            </button>
          </form>
        </div>

        <div className="pay-summary-section">
           <h3>Total a pagar</h3>
           <div className="pay-total-amount">
             {totalPrice}€
           </div>
           <div className="secure-badge">
             🔒 Validación Luhn & SSL Activos
           </div>
        </div>
      </div>
    </div>
  );
}

export default Pay;