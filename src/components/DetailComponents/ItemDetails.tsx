import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  const fetchItemData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hassan-hardware/items/${itemId}/`
      );
      console.log(response.data);
      setItem(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {item ? (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.itemSize}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Material: {item.itemMaterial}
              </h6>
              <p className="card-text">
                Weight per item: {item.itemWeight}
                <br />
                Quantity Remaining: {item.quantity}
              </p>
            </div>
          </div>
          <hr className="border border-success border-2 opacity-50"></hr>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Purchase Date</th>
                <th scope="col">Per Piece Cost</th>
                <th scope="col">Quantity Sold</th>
                <th scope="col">Quantity Remaining</th>
                <th scope="col">Total Quantity</th>
                <th scope="col">Total Cost</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {item.itemRecords.map((itemRecord, index) => (
                <tr key={itemRecord.id} className={"table-primary"}>
                  <td>{itemRecord.purchaseDate}</td>
                  <td>{itemRecord.costPrice}</td>
                  <td>{itemRecord.quantitySold}</td>
                  <td>{itemRecord.quantityRemaining}</td>
                  <td>{itemRecord.quantity}</td>
                  <td>{itemRecord.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>No Data Found</>
      )}
    </>
  );
};

export default ItemDetails;
