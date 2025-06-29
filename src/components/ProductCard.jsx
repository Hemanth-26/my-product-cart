import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: "18rem", objectFit: "contain" }}
        />
        <div className="card-body d-flex flex-column flex-end justify-content-around">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text fw-bold">₹ {product.price}</p>
          {/* <p className="badge bg-secondary mb-3">{product.category}</p> */}
          <div className="mt-auto con-cart-btn">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-primary me-2"
            >
              Details
            </Link>
            <button
              className="btn btn-success"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
