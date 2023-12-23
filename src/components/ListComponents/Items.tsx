import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Items = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/items/"
      );
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Material</th>
            <th scope="col">Weight per unit</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.map((item, index) => (
            <tr key={item.itemId} className={"table-primary"}>
              <th scope="row">
                <Link to={`/items/${item.itemId}/`}>{item.itemSize}</Link>
              </th>
              <td>{item.itemMaterial}</td>
              <td>{item.itemWeight}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Items;
