import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../redux/actions/cartActions";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncrease = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(addToCart(updatedItem));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h3 className="mb-3">Your cart is currently empty 🛒</h3>
        <button
          className="btn btn-outline-dark d-inline-flex align-items-center gap-2"
          onClick={() => navigate("/")}
        >
          <i className="fi fi-rr-arrow-left"></i>
          <span>Continue Shopping</span>
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="table-responsive border rounded">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th style={{ width: "150px" }}>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₹ {item.price}</td>
                <td>₹ {(item.price * item.quantity)?.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-end fw-bold">
                Total:
              </td>
              <td colSpan="2" className="fw-bold">
                ₹ {calculateTotal()?.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
