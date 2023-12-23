import "./products.scss";
//import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState, useEffect } from "react";

//import { products } from "../../../data";
//import { Button } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/items/"
      );
      setProducts(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setProducts([]);
      setLoading(false);
    }
  };
  const handleOnChangeSearch = async (value: string) => {
    try {
      const API =
        value && value.length > 0
          ? `http://localhost:8080/hassan-hardware/items/search/${value}/`
          : "http://localhost:8080/hassan-hardware/items/";
      const response = await axios.get(API);
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setProducts([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="list row-8">
      <div
        className="addUser"
        style={{
          fontSize: "12px",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <a
          className="btn btn-primary btn-sm"
          href="/products/add/"
          role="button"
        >
          <AddIcon />
          Add Product
        </a>
      </div>
      <div
        className="searchCustomer"
        style={{
          alignItems: "center",
          alignSelf: "center",
          marginTop: "0px",
          paddingTop: "0px",
          marginLeft: "10px",
          marginBottom: "10px",
          width: "200px",
        }}
      >
        <input
          type="text"
          placeholder="Search Product"
          style={{ width: "200px" }}
          onChange={(e) => handleOnChangeSearch(e.target.value)}
        />
      </div>
      <table className="table table-hover table-dark table-sm">
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Brand</th>
            <th scope="col">Material</th>
            <th scope="col">Weight Per Unit</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody className="table-group-divider tableItem table-light">
          {products.map((product) => (
            <tr
              key={product.itemId}
              onClick={() =>
                (window.location.href = `/products/${product.itemId}/`)
              }
            >
              <td>{product.itemSize}</td>
              <td>{product.brand.brandName}</td>
              <td>{product.itemMaterial}</td>
              <td>{product.itemWeight}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
