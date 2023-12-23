import React, { useState } from "react";
import CustomerBillPopup from "./CustomerBillPopup";
import "./popup.scss";
import { Button } from "antd";

interface PopupInterface {
  customers: any[];
  shops: any[];
  shopTypes: any[];
  setNewCustomer: any;
  newCustomer: any;
  setNewShop: any;
  newShop: any;
  setLocalCustomer: any;
  localCustomer: any;
  resetCustomerAndShopData: any;
  setSelectedCustomerIndex: any;
  selectedCustomerIndex: any;
  setSelectedCustomerId: any;
  selectedShopTypeIndex: any;
  setSelectedShopIndex: any;
  setSelectedShopTypeIndex: any;
  selectedShopIndex: any;
  setShopEmailId: any;
  setShopName: any;
  setShopAddress: any;
  setShopPhoneNumber: any;
  setShopType: any;
  shopAddress: any;
  shopEmailId: any;
  shopPhoneNumber: any;
  shopName: any;
  setEmailId: any;
  emailId: any;
  setPhoneNumber: any;
  phoneNumber: any;
  setCustomerName: any;
  customerName: any;
}

const CustomerBillPopupComponent: React.FC = ({
  customers,
  shops,
  shopTypes,
  setNewCustomer,
  newCustomer,
  setNewShop,
  newShop,
  setLocalCustomer,
  localCustomer,
  resetCustomerAndShopData,
  setSelectedCustomerIndex,
  selectedCustomerIndex,
  setSelectedCustomerId,
  selectedShopTypeIndex,
  setSelectedShopIndex,
  setSelectedShopTypeIndex,
  selectedShopIndex,
  setShopEmailId,
  setShopName,
  setShopAddress,
  setShopPhoneNumber,
  setShopType,
  shopAddress,
  shopEmailId,
  shopPhoneNumber,
  shopName,
  setEmailId,
  emailId,
  setPhoneNumber,
  phoneNumber,
  setCustomerName,
  customerName,
}: PopupInterface) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  //if (!customerPayment) return;
  return (
    <div>
      <h5
        style={{
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        Customer
      </h5>
      <Button
        className="btn btn-light"
        style={{
          marginTop: "0px",
          fontSize: "14px",
          alignItems: "center",
          alignSelf: "center",
          width: "300px",
          marginBottom: "10px",
        }}
        onClick={openPopup}
      >
        {selectedCustomerIndex < 0 && (!customerName || customerName === "")
          ? "Customer"
          : selectedCustomerIndex > -1
          ? customers[selectedCustomerIndex].customerName +
            " / " +
            customers[selectedCustomerIndex].shopName
          : customerName +
            " / " +
            (selectedShopIndex > -1
              ? shops[selectedShopIndex].shopName
              : shopName)}
      </Button>
      <CustomerBillPopup isOpen={isPopupOpen} onClose={closePopup}>
        <div
          style={{
            paddingLeft: "20px",
            paddingTop: "10px",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridAutoRows: "minmax(100px, auto)",
          }}
        >
          <div
            style={{
              gridColumn: "span 1",
              gridRow: "span 1",
            }}
          >
            <div
              className="btn-group"
              role="group"
              aria-label="Basic checkbox2 toggle button group"
            >
              <input
                type="checkbox"
                className="btn-check"
                id="btncheck2"
                autoComplete="off"
                onClick={() => {
                  setNewCustomer(!newCustomer);
                  setNewShop(newShop ? !newShop : newShop);
                  setLocalCustomer(
                    newCustomer
                      ? !localCustomer
                        ? localCustomer
                        : !localCustomer
                      : false
                  );
                  resetCustomerAndShopData();
                  setSelectedCustomerIndex(-1);
                }}
                checked={newCustomer}
              />
              <label className="btn btn-outline-primary" htmlFor="btncheck2">
                New Customer
              </label>
            </div>
            <br />
            <label htmlFor="myDropdown">Select Customer:</label>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={newCustomer}
                style={{ fontSize: "18px" }}
              >
                {selectedCustomerIndex === -1
                  ? "Select Customer"
                  : customers[selectedCustomerIndex].customerName +
                    " / " +
                    customers[selectedCustomerIndex].shopName}
              </button>
              <ul className="dropdown-menu">
                {customers.map((customer, index) => (
                  <li
                    key={customer.customerId}
                    onClick={() => {
                      setSelectedCustomerIndex(index);
                      setSelectedCustomerId(customer.customerId);
                    }}
                  >
                    <a
                      className={
                        selectedCustomerIndex === index
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                    >
                      {customer.customerName + " / " + customer.shopName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
                  disabled={!newCustomer}
                  required={newCustomer}
                  value={customerName}
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
                  disabled={!newCustomer}
                  required={newCustomer}
                  value={phoneNumber}
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
                  disabled={!newCustomer}
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
            </div>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic checkbox toggle button group"
            >
              <input
                type="checkbox"
                className="btn-check"
                id="btncheck3"
                autoComplete="off"
                onClick={() => {
                  setLocalCustomer(!localCustomer);
                  setSelectedShopIndex(-1);
                  setShopAddress("");
                  setShopEmailId("");
                  setShopName("");
                  setShopAddress("");
                  setShopPhoneNumber("");
                  setSelectedShopTypeIndex(-1);
                }}
                checked={localCustomer}
                disabled={!newCustomer}
              />
              <label className="btn btn-outline-primary" htmlFor="btncheck3">
                Local Customer
              </label>
            </div>
          </div>
          <div
            style={{
              gridColumn: "span 1",
              gridRow: "span 1",
            }}
          >
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
                disabled={!newCustomer || localCustomer}
              />
              <label className="btn btn-outline-primary" htmlFor="btncheck1">
                New Shop
              </label>
            </div>
            <br />
            <label htmlFor="shopDropdown">Select Shop:</label>
            <div className="dropdown" style={{ marginBottom: "0px" }}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="shopDropdown"
                disabled={!newCustomer || newShop || localCustomer}
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
            <ul className="dropdown-menu" style={{ marginBottom: "0px" }}>
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
            <div className="title" style={{ marginTop: "10px" }}>
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
                  disabled={!newShop || localCustomer}
                  required={newShop && newCustomer && !localCustomer}
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
                  disabled={!newShop || localCustomer}
                  required={newShop && newCustomer && !localCustomer}
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
                  disabled={!newShop || localCustomer}
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
                  disabled={!newShop || localCustomer}
                  required={newShop && newCustomer && !localCustomer}
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
                disabled={!newShop || localCustomer}
              >
                Shop Type
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
        </div>
      </CustomerBillPopup>
    </div>
  );
};

export default CustomerBillPopupComponent;
