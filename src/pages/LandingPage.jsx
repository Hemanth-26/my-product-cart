import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { fetchProductsRequest } from "../redux/actions/productActions";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const categories = [...new Set(products.map((p) => p.category))];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Explore Products</h2>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={(cat) => setSelectedCategory(cat)}
        onClear={() => setSelectedCategory(null)}
      />

      {loading ? (
        <div className="loader-wrapper">
          <div class="loader"></div>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
}
