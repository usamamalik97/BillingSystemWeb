import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../Table";

const Bills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (data.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/bills/all/"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table data={data} />
    </>
  );
};

export default Bills;
