// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext.jsx'
// import { CartProvider } from './context/CartContext.jsx'  // <-- import CartProvider

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <AuthProvider>
//       <CartProvider>  {/* Wrap App with CartProvider */}
//         <App />
//       </CartProvider>
//     </AuthProvider>
//   </BrowserRouter>
// )










// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext.jsx'
// import { CartProvider } from './context/CartContext.jsx'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <CartProvider>
//           <App />
//           <ToastContainer position="top-right" autoClose={1500} />
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// )











import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
        <ToastContainer position="top-right" autoClose={1000} />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)
