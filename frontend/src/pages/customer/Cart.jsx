
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const { cartItems, removeFromCart, getTotal, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleRemove = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      toast.success("Removed from cart");
    } catch {
      toast.error("Error removing item");
    }
  };

  const handleQuantityChange = async (cartItemId, action) => {
    try {
      await updateQuantity(cartItemId, action);
      toast.success("Cart updated");
    } catch {
      toast.error("Failed to update cart");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item.product.price} x {item.quantity}
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, "decrease")}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    disabled={item.quantity === 1}
                    aria-label={`Decrease quantity of ${item.product.name}`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, "increase")}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    aria-label={`Increase quantity of ${item.product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold">
                  ₹{item.product.price * item.quantity}
                </p>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold">Total: ₹{getTotal()}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
