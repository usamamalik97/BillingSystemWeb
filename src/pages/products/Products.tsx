import "./products.scss";
import { Link } from "react-router-dom";
interface ProductsInterface {
  products: any[];
}

const Products = ({ products }: ProductsInterface) => {
  return (
    <div className="products">
      <Link
        to="/products/"
        className="listItem"
        style={{ color: "darkslategrey" }}
      >
        <h5>Products</h5>
      </Link>
      <div className="list">
        <table className="table table-hover table-success table-sm">
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Brand</th>
              <th scope="col">Weight Per Unit</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody className="table-group-divider tableItem table-success">
            {products.map((product) => (
              <tr
                key={product.itemId}
                onClick={() =>
                  (window.location.href = `/products/${product.itemId}/`)
                }
              >
                <td>{product.itemSize}</td>
                <td>{product.brand.brandName}</td>
                <td>{product.itemWeight}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
