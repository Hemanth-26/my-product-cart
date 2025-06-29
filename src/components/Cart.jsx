import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartCount = useSelector((state) =>
    state?.cart?.items?.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Link to="/cart" className="btn btn-outline-light position-relative cart-btn">
      <i className="fi fi-rr-shopping-cart"></i> Cart
      {cartCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
