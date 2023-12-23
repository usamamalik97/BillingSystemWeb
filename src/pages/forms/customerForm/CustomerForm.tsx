import { useState, useEffect } from "react";
import "./customerForm.scss";
import { Button } from "antd";
import axios from "axios";

const CustomerForm = () => {
  const [newShop, setNewShop] = useState(false);
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
  const [selectedShopTypeIndex, setSelectedShopTypeIndex] = useState(-1);
  const [selectedShopIndex, setSelectedShopIndex] = useState(-1);
  const [shopsFetched, setShopsFetched] = useState(false);
  const [shopTypesFetched, setShopTypesFetched] = useState(false);
  const formData = new URLSearchParams();

  const fetchShopTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/shops/shop_types/"
      );
      console.log(response.data);
      setShopTypes(response.data);
      setShopTypesFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchShops = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/shops/"
      );
      console.log(response.data);
      setShops(response.data);
      setShopsFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("form Submitted");
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
    console.log(formData.get("Shop"));
    console.log(formData.get("Customer"));

    axios
      .post("http://localhost:8080/hassan-hardware/customers/add", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        window.location.href = `/customers/${response.data.customerId}/`;
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
      });
  };

  useEffect(() => {
    fetchShopTypes();
    fetchShops();
  }, []);
  if (!shopTypesFetched || !shopsFetched) return <div>Loading...</div>;
  return (
    <div className="customerFormCss">
      <form className="form1" onSubmit={handleSubmit}>
        <div className="box box1">
          <div className="title">
            <b>New Customer</b>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                aria-label="Name"
                aria-describedby="basic-addon3 basic-addon4"
                required
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Phone Number
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="number"
                placeholder="Enter Phone Number"
                aria-label="Number"
                aria-describedby="basic-addon3 basic-addon4"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                aria-label="Role"
                aria-describedby="basic-addon3 basic-addon4"
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="btn btn-primary"
            htmlType="submit"
            value="Submit"
            onSubmit={handleSubmit}
          >
            Confirm
          </Button>
        </div>
        <div className="box box1">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              className="btn-check"
              id="btncheck1"
              autoComplete="off"
              onClick={() => {
                setNewShop(!newShop);
                setSelectedShopIndex(-1);
                setShopAddress("");
                setShopEmailId("");
                setShopName("");
                setShopAddress("");
                setShopPhoneNumber("");
                setSelectedShopTypeIndex(-1);
              }}
              checked={newShop}
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck1">
              New Shop
            </label>
          </div>

          <br />
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              disabled={newShop}
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
          <div className="title">
            <b>New Shop</b>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                aria-label="Name"
                aria-describedby="basic-addon3 basic-addon4"
                disabled={!newShop}
                required={newShop}
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Phone Number
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="number"
                placeholder="Enter Phone Number"
                aria-label="Number"
                aria-describedby="basic-addon3 basic-addon4"
                disabled={!newShop}
                required={newShop}
                value={shopPhoneNumber}
                onChange={(e) => setShopPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                aria-label="Role"
                aria-describedby="basic-addon3 basic-addon4"
                disabled={!newShop}
                required={newShop}
                value={shopEmailId}
                onChange={(e) => setShopEmailId(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
                aria-label="Role"
                aria-describedby="basic-addon3 basic-addon4"
                disabled={!newShop}
                required={newShop}
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              disabled={!newShop}
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
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
