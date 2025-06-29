import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQuantity } from "../redux/actions/cartActions";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productFromRedux = useSelector((state) =>
    state.product.products.find((p) => p.id === parseInt(id))
  );

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === parseInt(id))
  );

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [product, setProduct] = useState(productFromRedux || null);
  const [loading, setLoading] = useState(!productFromRedux);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productFromRedux) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });
    }
  }, [id, productFromRedux]);

  const handleAddToCart = () => {
    const productWithQty = { ...product, quantity };
    dispatch(addToCart(productWithQty));
  };

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading || !product)
    return (
      <div className="loader-wrapper">
        <div class="loader"></div>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="mb-3 text-end d-flex justify-content-between">
        <span className="fe-6 cursor-pointer" onClick={() => navigate(-1)}>
          <i className="fi fi-rr-arrow-left me-3"></i>
        </span>
        {totalQuantity > 0 ? (
          <span className="badge bg-primary fs-6">
            Items in Cart: {totalQuantity}
          </span>
        ) : null}
      </div>
      <div className="row">
        <div
          className="col-md-6 d-flex justify-content-center"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="product-img">
            <img
              src={product.image}
              alt={product.title}
              //   className="img-fluid"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="my-3 my-md-0">{product.title}</h3>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h4 className="fw-bold">₹ {product.price}</h4>

          {/* <div className="mt-4 d-flex align-items-center gap-3">
            <button className="btn btn-outline-danger" onClick={decreaseQty}>
              –
            </button>
            <span className="fs-5">{quantity}</span>
            <button className="btn btn-outline-success" onClick={increaseQty}>
              +
            </button>
          </div> */}

          <button className="btn btn-success mt-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
