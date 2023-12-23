import "./products.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const ProductsReport = () => {
  const [products, setProducts] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  const [totalWeight, setTotalWeight] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnChangeSearchDate = async (value: string) => {
    try {
      if (value) {
        const API = `http://localhost:8080/hassan-hardware/items/report/${value}/`;
        const response = await axios.get(API);
        console.log(response.data);
        setProducts(response.data.itemRecords);
        setTotalCost(response.data.totalCost);
        setTotalWeight(response.data.totalWeight);
      } else {
        setProducts([]);
      }
      setLoading(false);
    } catch (error) {
      setProducts([]);
      setLoading(false);
    }
  };

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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h5>Products</h5>
        <h6
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <span>
            <b style={{ marginRight: "5px" }}>Total Cost: </b>
          </span>
          <span>{totalCost}</span>
        </h6>
        <h6
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <span>
            <b style={{ marginRight: "5px" }}>Total Weight Grams: </b>
          </span>
          <span>{totalWeight}</span>
        </h6>
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
          type="date"
          placeholder="Search Products For"
          style={{ width: "200px" }}
          onChange={(e) => handleOnChangeSearchDate(e.target.value)}
        />
      </div>
      <table className="table table-hover table-dark table-sm">
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Material</th>
            <th scope="col">Weight Per Unit</th>
            <th scope="col">Quantity</th>
            <th scope="col">Quantity Sold</th>
            <th scope="col">Quantity Remaining</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Total Weight Grams</th>
          </tr>
        </thead>
        <tbody className="table-group-divider tableItem table-light">
          {products.map((product, index) => (
            <tr
              key={index}
              onClick={() =>
                (window.location.href = `/products/${product.item.itemId}/`)
              }
            >
              <td>{product.item.itemSize}</td>
              <td>{product.item.itemMaterial}</td>
              <td>{product.item.itemWeight}</td>
              <td>{product.quantity}</td>
              <td>{product.quantitySold}</td>
              <td>{product.quantityRemaining}</td>
              <td>{product.totalCost}</td>
              <td>{product.totalWeight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsReport;
