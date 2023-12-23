import axios from "axios";
import { useState, useEffect } from "react";

const RestController = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //  useEffect(() => {
  // Function to fetch data from the API
  const fetchData = async () => {
    if (data.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/bill-statuses/all/"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  // Call the fetch function when the component mounts
  fetchData();
  //  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className=" btn btn-secondary dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedIndex === -1 ? "Status" : data[selectedIndex].status}
      </button>
      <ul className="dropdown-menu">
        <li key="NotSelected">
          <a
            className="dropdown-item"
            onClick={() => {
              setSelectedIndex(-1);
            }}
          >
            Select Option
          </a>
        </li>
        {data.map((item, index) => (
          <li key={index}>
            <a
              className={
                selectedIndex === index
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              {item.status}
            </a>
          </li>
        ))}
      </ul>

      <h1>Data from API:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <p>Status: {item.status}</p>
            <p>Description: {item.description}</p>
            <p>Created On: {item.createdOn}</p>
            <p>Modified On: {item.modifiedOn}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestController;
