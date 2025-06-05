import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { cartItems, getTotal, refreshCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Load Razorpay checkout.js script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle successful payment verification response from backend
  const handlePaymentSuccess = async (response) => {
    try {
      const res = await fetch("/api/payment/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
      const data = await res.json();

      if (data.status === "success") {
        alert("Payment successful! Order placed.");
        await refreshCart();
        navigate("/orders");
      } else {
        alert("Payment verification failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error during payment verification.");
    } finally {
      setLoading(false);
    }
  };

  // Main checkout handler
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      setLoading(false);
      return;
    }

    try {
      // Create order on backend (note the updated path)
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getTotal() * 100 }), // Amount in paise
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderRes.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,  // Your Razorpay key from .env
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CraftKart",
        description: "Order Payment",
        order_id: orderData.id,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          email: "customer@example.com", // Replace with real user email if possible
          contact: "9999999999", // Replace with real contact
        },
        theme: {
          color: "#2563eb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert("Failed to initiate payment");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map(({ product, quantity }) => (
              <li
                key={product._id}
                className="border-b py-2 flex justify-between"
              >
                <span>
                  {product.name} × {quantity}
                </span>
                <span>₹{product.price * quantity}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{getTotal()}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Processing..." : "🛒 Pay with Razorpay"}
          </button>
        </>
      )}
    </div>
  );
}
