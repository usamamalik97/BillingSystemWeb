import React from "react";
import Carousel from "./Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "./Table";

interface HomeProps {
  carousalData: ["/Disc1.JPG", "/Disc2.JPG", "/Disc3.JPG"];
}
const Home = ({ carousalData }: HomeProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Function to fetch data from the API
  const fetchData = async () => {
    /*if (data.length === 0) {
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
    }*/
  };

  // Call the fetch function when the component mounts
  fetchData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Carousel carousalData={carousalData} />
      <Table data={data} />
    </>
  );
};

export default Home;
