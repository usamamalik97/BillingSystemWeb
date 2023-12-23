import { useState, useEffect } from "react";
import axios from "axios";
//import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import { Form, Input, Cascader, InputNumber, DatePicker, Button } from "antd";

const BillForm = () => {
  const [items, setItems] = useState([
    { size: "", material: "", quantity: 0, price: 0, selectedItemIndex: -1 },
  ]);
  const [soldItems, setSoldItems] = useState([
    { sellPrice: 0.0, quantitySold: 0, itemRecordId: 0 },
  ]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [fetchedItems, setFetchedItems] = useState([]);
  const [shopTypes, setShopTypes] = useState([]);
  const [customers, setCustomers] = useState([]);
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
  const [newCustomer, setNewCustomer] = useState(false);
  const [selectedShopTypeIndex, setSelectedShopTypeIndex] = useState(-1);
  const [selectedShopIndex, setSelectedShopIndex] = useState(-1);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(-1);
  const [selectedCustomerId, setSelectedCustomerId] = useState(-1);
  const [totalBillAmount, setTotalBillAmount] = useState(0.0);
  const [shopTypesFetched, setShopTypesFetched] = useState(false);
  const [customersFetched, setCustomersFetched] = useState(false);
  const [shopFetched, setShopFetched] = useState(false);
  const [itemsFetched, setItemsFetched] = useState(false);

  const formData = new URLSearchParams();

  const fetchShopTypes = async () => {
    if (shopTypes.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/shops/shop_types/"
        );
        setShopTypesFetched(true);
        setShopTypes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/customers/"
      );
      console.log(response.data);
      setCustomers(response.data);
      setCustomersFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchShops = async () => {
    if (shops.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/shops/"
        );
        setShopFetched(true);
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/items/"
      );
      setFetchedItems(response.data);
      setItemsFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("form Submitted");
    event.preventDefault();
    if (
      (selectedShopIndex === -1 &&
        selectedShopTypeIndex === -1 &&
        selectedCustomerIndex === -1) ||
      (newCustomer && newShop && selectedShopTypeIndex === -1) ||
      (!newCustomer && selectedCustomerIndex === -1) ||
      (newCustomer && !newShop && selectedShopIndex === -1) //||
      //items.length === 0
    ) {
      console.log("All Fields must be selected:");
      console.log(
        "Customer EmailId: " +
          emailId +
          " Customer Phone Number: " +
          phoneNumber +
          " Customer Name: " +
          customerName +
          " selectedCustomerId: " +
          selectedCustomerId
      );
      console.log(
        "Shop EmailId: " +
          shopEmailId +
          " Shop Phone Number: " +
          shopPhoneNumber +
          " Shop Name: " +
          shopName +
          " selectedShopIndex: " +
          selectedShopIndex +
          " Shop Address: " +
          shopAddress +
          " shopType: " +
          shopType
      );
      items.map((item, index) => {
        console.log(
          "ItemId: " +
            (fetchedItems ? fetchedItems[item.selectedItemIndex].itemId : 0) +
            " SelectedItemIndex: " +
            item.selectedItemIndex +
            " Quantity: " +
            item.quantity +
            " Price: " +
            item.price
        );
      });
      return;
    }
    console.log("Items: " + items);
    const newItems = [...soldItems];
    newItems.splice(0, 1);
    setSoldItems(newItems);
    items.map((item, index) => {
      console.log("SoldItems:" + soldItems + " Index: " + index);
      console.log(
        "ItemId: " +
          (fetchedItems ? fetchedItems[item.selectedItemIndex].itemId : 0) +
          " SelectedItemIndex: " +
          item.selectedItemIndex +
          " Quantity: " +
          item.quantity +
          " Price: " +
          item.price
      );
      if (soldItems[index]) {
        soldItems[index].itemRecordId =
          fetchedItems[item.selectedItemIndex].itemId;
        soldItems[index].quantitySold = item.quantity;
        soldItems[index].sellPrice = item.price;
        setSoldItems(soldItems);
      } else {
        setSoldItems([
          ...soldItems,
          {
            sellPrice: item.price,
            quantitySold: item.quantity,
            itemRecordId: fetchedItems[item.selectedItemIndex].itemId,
          },
        ]);
      }
    });
    console.log(soldItems);
    if (newCustomer) {
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
    } else {
      formData.append(
        "Customer",
        JSON.stringify({ customerId: selectedCustomerId })
      );
      formData.append(
        "Shop",
        JSON.stringify({
          shopId: -1,
        })
      );
    }
    formData.append("Items", JSON.stringify(soldItems));
    formData.append(
      "Bill",
      JSON.stringify({ totalAmount: calculateTotalBillAmount(), paidAmount })
    );
    console.log("API response:", formData);
    console.log(formData.get("Items"));
    console.log(formData.get("Customer"));
    console.log(formData.get("Shop"));
    axios
      .post("http://localhost:8080/hassan-hardware/bill/add", formData, {
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
  const calculateTotalBillAmount = () => {
    let total = 0.0;
    items.map((item, index) => {
      if (item.quantity && item.price) {
        total += parseInt(item.quantity) * parseFloat(item.price);
      }
    });
    return total;
  };
  /*const handleItemSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    newItems[index].size = e.target.value;
    setItems(newItems);
  };
  const handleItemMaterialChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    newItems[index].material = e.target.value;
    setItems(newItems);
  };*/
  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    selectedIndex: number
  ) => {
    const newItems = [...items];
    let value = parseInt(e.target.value);
    newItems[index].quantity =
      value > parseInt(fetchedItems[selectedIndex].quantity)
        ? fetchedItems[selectedIndex].quantity
        : value;
    setItems(newItems);
    setTotalBillAmount(calculateTotalBillAmount());
  };
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    newItems[index].price = parseFloat(e.target.value);
    setItems(newItems);
    setTotalBillAmount(calculateTotalBillAmount());
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    setTotalBillAmount(calculateTotalBillAmount());
  };
  const resetCustomerAndShopData = () => {
    setShopName("");
    setCustomerName("");
    setPhoneNumber("");
    setEmailId("");
    setShopEmailId("");
    setShopType("");
    setShopAddress("");
    setShopPhoneNumber("");
    setSelectedShopTypeIndex(-1);
    setSelectedShopIndex(-1);
    setNewCustomer(!newCustomer);
    setNewShop(false);
  };
  const addItem = () => {
    setItems([
      ...items,
      { size: "", material: "", quantity: 0, price: 0, selectedItemIndex: -1 },
    ]);
  };
  useEffect(() => {
    fetchCustomers();
    fetchItems();
  }, []);

  fetchShopTypes();
  fetchShops();
  return (
    <>
      {
        /*itemsFetched && shopFetched && shopTypesFetched && customersFetched*/ true ? (
          <form className="row g-3" name="NewCustomer" onSubmit={handleSubmit}>
            {newCustomer ? (
              <>
                {/*<div className="col-12">
                  <button type="submit" className="btn btn-light">
                    Add New Customer
                  </button>
            </div>*/}
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
                    required={newCustomer}
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
                    required={newCustomer}
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
                    required={newCustomer}
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
                        required={newShop && newCustomer}
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
                        required={newShop && newCustomer}
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="inputShopPhoneNumber"
                        className="form-label"
                      >
                        Shop Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputShopPhoneNumber"
                        value={shopPhoneNumber}
                        onChange={(e) => setShopPhoneNumber(e.target.value)}
                        required={newShop && newCustomer}
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
                        required={newShop && newCustomer}
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
                      newShop
                        ? setSelectedShopTypeIndex(-1)
                        : setSelectedShopIndex(-1);

                      setNewShop(!newShop);
                    }}
                  >
                    {newShop ? "Select Shop" : "Add New Shop"}
                  </button>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      resetCustomerAndShopData();
                    }}
                  >
                    Select Customer
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedCustomerIndex === -1
                      ? "Select Customer"
                      : customers[selectedCustomerIndex].customerName}
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
                          {customer.customerName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setNewCustomer(!newCustomer);
                    }}
                  >
                    New Customer
                  </button>
                </div>
              </>
            )}
            <p>
              <b>Total Bill: </b>
              {totalBillAmount}
              <br />
              <b>Payment Received</b>
              <Input
                type="number"
                placeholder="Payment Received"
                value={paidAmount}
                onChange={(e) => setPaidAmount(parseInt(e.target.value))}
              />
            </p>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Size / Material</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="dropdown">
                        <button
                          className="dropdown-toggle btn btn-light"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {item.selectedItemIndex === -1
                            ? "Size / Material"
                            : fetchedItems[item.selectedItemIndex].itemSize +
                              "/" +
                              fetchedItems[item.selectedItemIndex].itemMaterial}
                        </button>
                        <ul className="dropdown-menu">
                          {fetchedItems.map((innerItem, innerIndex) => (
                            <li
                              key={innerItem.itemId}
                              onClick={() => {
                                item.selectedItemIndex = innerIndex;
                              }}
                            >
                              <a
                                className={
                                  item.selectedItemIndex === innerIndex
                                    ? "dropdown-item active"
                                    : "dropdown-item"
                                }
                              >
                                {innerItem.itemSize} / {innerItem.itemMaterial}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={parseInt(item.quantity)}
                        onChange={(e) =>
                          handleQuantityChange(e, index, item.selectedItemIndex)
                        }
                        max={
                          item.selectedItemIndex === -1
                            ? Infinity
                            : fetchedItems[item.selectedItemIndex].quantity
                        }
                      />
                      Left:{" "}
                      {item.selectedItemIndex === -1
                        ? 0
                        : fetchedItems[item.selectedItemIndex].quantity}
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Price"
                        value={parseFloat(item.price)}
                        onChange={(e) => handlePriceChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        type="number"
                        placeholder="Total"
                        value={
                          (item.price ? parseFloat(item.price) : 0) *
                          (item.quantity ? parseInt(item.quantity) : 0)
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="btn btn-light" type="button" onClick={addItem}>
              Add Item
            </button>
            <button className="btn btn-success" type="submit">
              Confirm
            </button>
          </form>
        ) : (
          <div>Loading...</div>
        )
      }
    </>
  );
};

export default BillForm;
