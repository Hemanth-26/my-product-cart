import { Link } from "react-router-dom";
import Cart from "./Cart";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark header">
      <Link className="navbar-brand" to="/">
        Products
      </Link>
      <div className="">
        <Cart />
      </div>
    </nav>
  );
}
