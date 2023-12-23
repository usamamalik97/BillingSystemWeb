import React from "react";
import Navbar from "../navbar/NavbarCustom";
import { useState } from "react";
import axios from "axios";

const CustomerForm = () => {
  const [shopTypes, setShopTypes] = useState([]);
  const [shops, setShops] = useState([]);
  const [shopName, setShopName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [shopEmailId, setShopEmailId] = useState("");
  const [shopType, setShopType] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopPhoneNumber, setShopPhoneNumber] = useState("");
  const [newShop, setNewShop] = useState(false);
  const [selectedShopTypeIndex, setSelectedShopTypeIndex] = useState(-1);
  const [selectedShopIndex, setSelectedShopIndex] = useState(-1);
  const formData = new URLSearchParams();

  const fetchShopTypes = async () => {
    if (shopTypes.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/shops/shop_types"
        );
        console.log(response.data);
        setShopTypes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const fetchShops = async () => {
    if (shops.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/shops/"
        );
        console.log(response.data);
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    console.log("form Submitted");
    event.preventDefault();
    if (selectedShopIndex === -1 && selectedShopTypeIndex === -1) return;
    formData.append(
      "Customer",
      JSON.stringify({ emailId, phoneNumber, customerName })
    );
    if (newShop) {
      formData.append(
        "Shop",
        JSON.stringify({
          shopName,
          emailId: shopEmailId,
          phoneNumber: shopPhoneNumber,
          shopType,
          address: shopAddress,
        })
      );
    } else {
      formData.append(
        "Shop",
        JSON.stringify({
          shopId: shops[selectedShopIndex].shopId,
        })
      );
    }
    console.log("API request:", formData);

    axios
      .post("http://localhost:8080/hassan-hardware/customers/add", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
      });
  };
  fetchShopTypes();
  fetchShops();
  return (
    <>
      <Navbar />
      <form className="row g-3" name="NewCustomer" onSubmit={handleSubmit}>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add New Customer
          </button>
        </div>
        <h5>Customer Information</h5>
        <br />
        <div className="col-md-6">
          <label htmlFor="inputCustomerName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCustomerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputNumber" className="form-label">
            Customer Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail" className="form-label">
            Customer Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        {newShop ? (
          <>
            <h5>Shop Information</h5>
            <div className="col-md-6">
              <label htmlFor="inputShopName" className="form-label">
                Shop Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputShopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required={newShop}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputShopAddress" className="form-label">
                Shop Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputShopAddress"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
                required={newShop}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputShopPhoneNumber" className="form-label">
                Shop Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="inputShopPhoneNumber"
                value={shopPhoneNumber}
                onChange={(e) => setShopPhoneNumber(e.target.value)}
                required={newShop}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputShopEmail" className="form-label">
                Shop Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputShopEmail"
                value={shopEmailId}
                onChange={(e) => setShopEmailId(e.target.value)}
                required={newShop}
              />
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedShopTypeIndex === -1
                  ? "Shop Type"
                  : shopTypes[selectedShopTypeIndex].description}
              </button>
              <ul className="dropdown-menu">
                {shopTypes.map((shopType, index) => (
                  <li
                    key={shopType.type}
                    onClick={() => {
                      setSelectedShopTypeIndex(index);
                      setShopType(shopType.type);
                      setSelectedShopIndex(-1);
                    }}
                  >
                    <a
                      className={
                        selectedShopTypeIndex === index
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                    >
                      {shopType.description}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedShopIndex === -1
                ? "Shops"
                : shops[selectedShopIndex].shopName}
            </button>
            <ul className="dropdown-menu">
              {shops.map((shop, index) => (
                <li
                  key={shop.shopId}
                  onClick={() => {
                    setSelectedShopIndex(index);
                    setSelectedShopTypeIndex(-1);
                  }}
                >
                  <a
                    className={
                      selectedShopIndex === index
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                  >
                    {shop.shopName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              newShop ? setSelectedShopTypeIndex(-1) : setSelectedShopIndex(-1);

              setNewShop(!newShop);
            }}
          >
            {newShop ? "Select Shop" : "Add New Shop"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerForm;
