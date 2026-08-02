# KingFoot

KingFoot is a small e-commerce demo built with React and Vite. The idea is simple: browse football shirts, add them to the cart, and go through a sample checkout flow.

## What it includes

- A catalog of football shirts with sample products
- The option to add items to the cart
- A cart view with an order summary
- A payment form with basic validation
- A layout designed to work well on both mobile and desktop

## Technologies used

- React
- Vite
- JavaScript / JSX
- CSS

## How to run it

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the project:
   ```bash
   npm run dev
   ```
3. Open the local URL shown by Vite in your browser.

## Build for production

```bash
npm run build
```

## Project structure

- src/App.jsx: main component with the catalog, cart state, and screen navigation
- src/components/Cart.jsx: cart view and order summary
- src/components/Pay.jsx: payment form and basic validations
- src/App.css and src/components/*.css: interface styles

## Note

- Products are loaded from example data inside the project.
- The payment flow is a demo and is not connected to a real payment provider.
