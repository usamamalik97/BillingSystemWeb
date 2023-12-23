import { useState, useEffect } from "react";
import axios from "axios";
import "./billForm.scss";
import AsyncSelect from "react-select/async";
import PaymentPopupComponent from "../../popup/PaymentPopupComponent";
import { useSelector } from "react-redux";

import { RootState } from "../../../app/store";
import CustomerBillPopup from "../../popup/customerBillPopup/CustomerBillPopup";
import CustomerBillPopupComponent from "../../popup/customerBillPopup/CustomerBillPopupComponent";
//import { setCredentials } from "../../../features/auth/authSlice";

interface ItemsOptionType {
  label: string;
  value: string;
}
const BillForm = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [items, setItems] = useState([
    {
      size: "",
      material: "",
      quantity: 0,
      price: 0,
      selectedItemIndex: -1,
      selectedItemId: -1,
      description: "",
    },
  ]);
  //const [paidAmount, setPaidAmount] = useState(0);
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
  const [itemsFetched, setItemsFetched] = useState(false);
  const [shopsFetched, setShopsFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localCustomer, setLocalCustomer] = useState(false);
  const [itemsOptions, setItemsOptions] = useState<ItemsOptionType[]>([]);
  const [cheque, setCheque] = useState({
    chequeNo: "",
    amount: 0,
    dueDate: "",
    bank: "",
  });
  const [paymentAmount, setPaymentAmount] = useState(0);
  let formData = new URLSearchParams();
  const handleSelectChange = (option: ItemsOptionType, index: number) => {
    items[index].selectedItemId = parseInt(option.value);
    items[index].description = getSelectedItemDescription(
      items[index].selectedItemId
    );
  };
  const handleSubmit = async (event: React.FormEvent) => {
    console.log("form Submitted");
    event.preventDefault();
    if (
      (selectedShopIndex === -1 &&
        selectedShopTypeIndex === -1 &&
        selectedCustomerIndex === -1 &&
        !localCustomer) ||
      (newCustomer && newShop && selectedShopTypeIndex === -1) ||
      (!newCustomer && selectedCustomerIndex === -1) ||
      (newCustomer && !newShop && selectedShopIndex === -1 && !localCustomer)
    ) {
      window.alert("Please select all required data");
      return;
    }

    formData = getCompleteFormData();
    let soldItems: any[] = getSoldItems();
    console.log(soldItems);
    if (getTotalQuantity(soldItems) < 1) {
      window.alert("Items count cannot be less than zero");
      return;
    }
    formData.append("Items", JSON.stringify(soldItems));
    console.log(formData.get("Items"));
    setLoading(true);
    axios
      .post("http://localhost:8080/hassan-hardware/bill/add", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        window.location.href = `/bills/${response.data.billId}`;
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
        setLoading(false);
      });
  };
  const getCompleteFormData = () => {
    let formData = new URLSearchParams();
    if (newCustomer) {
      formData.append(
        "Customer",
        JSON.stringify({ emailId, phoneNumber, customerName })
      );
      if (localCustomer) {
        formData.append(
          "Shop",
          JSON.stringify({
            shopId: 0,
          })
        );
      } else {
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
    formData.append(
      "Bill",
      JSON.stringify({
        totalAmount: calculateTotalBillAmount(),
        paidAmount: paymentAmount,
      })
    );
    formData.append(
      "Cheque",
      JSON.stringify({
        chequeNo: cheque.chequeNo,
        amount: cheque.amount,
        dueDate: cheque.dueDate,
        bank: cheque.bank,
      })
    );
    formData.append(
      "User",
      JSON.stringify({
        username: user.username,
      })
    );
    return formData;
  };
  const getTotalQuantity = (
    soldItems: [{ sellPrice: 0.0; quantitySold: 0; itemRecordId: 0 }]
  ) => {
    let total = 0;
    soldItems.map((soldItem) => {
      total += soldItem.quantitySold;
    });
    return total;
  };
  const getSoldItems = () => {
    let soldItems2 = [{ sellPrice: 0.0, quantitySold: 0, itemRecordId: 0 }];
    return items.map((item, index) => {
      if (soldItems2[index]) {
        return {
          ...soldItems2[index],
          itemRecordId: item.selectedItemId,
          quantitySold: item.quantity,
          sellPrice: item.price,
        };
      } else {
        return {
          sellPrice: item.price,
          quantitySold: item.quantity,
          itemRecordId: item.selectedItemId,
        };
      }
    });
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    let value = parseInt(e.target.value);
    newItems[index].quantity =
      value > getSelectedItemQuantity(newItems[index].selectedItemId)
        ? getSelectedItemQuantity(newItems[index].selectedItemId)
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

  const calculateTotalBillAmount = () => {
    let total = 0.0;
    items.map((item, index) => {
      if (item.quantity && item.price) {
        total += parseInt(item.quantity) * parseFloat(item.price);
      }
    });
    return total;
  };
  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    setTotalBillAmount(calculateTotalBillAmount());
    console.log(newItems);
  };
  const addItem = () => {
    setItems([
      ...items,
      {
        size: "",
        material: "",
        quantity: 0,
        price: 0,
        selectedItemIndex: -1,
        selectedItemId: -1,
        description: "",
      },
    ]);
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/items/"
      );
      const fetchedItems = response.data;
      const options = getItemsOptionsFromFetchedItems(fetchedItems);
      setItemsOptions(options);
      setFetchedItems(fetchedItems);
      setItemsFetched(true);
      console.log(fetchedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getItemsOptionsFromFetchedItems = (fetchedItemsTemp: []) => {
    const options: ItemsOptionType[] = [];
    fetchedItemsTemp.map((item) => {
      options.push({
        label: `${item.itemSize} / ${item.brand.brandName} / ${item.itemMaterial}`,
        value: item.itemId,
      });
    });
    return options;
  };
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/customers/all/"
      );
      console.log(response.data);
      setCustomers(response.data.customers);
      setCustomersFetched(true);
    } catch (error) {
      setCustomers([]);
    }
  };
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
      setShops(response.data.shops);
      setShopsFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getItems = () => {
    let filteredOptions = itemsOptions.filter(
      (item) => !itemAlreadySelected(parseInt(item.value))
    );
    return filteredOptions;
  };
  const loadOptions = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    // Simulate API call or filter options based on inputValue
    let filteredOptions = itemsOptions.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    filteredOptions = filteredOptions.filter(
      (item) => !itemAlreadySelected(parseInt(item.value))
    );
    // Return the filtered options
    callback(filteredOptions);
  };
  const itemAlreadySelected = (id: number) => {
    let itemSelected = false;
    items.map((item) => {
      if (item.selectedItemId === id) {
        itemSelected = true;
      }
    });
    return itemSelected;
  };
  const getSelectedItemDescription = (id: number) => {
    let description = "";
    fetchedItems.map((item) => {
      if (item.itemId === id) {
        description = `${item.itemSize} / ${item.itemMaterial}`;
      }
    });
    return description;
  };

  const getSelectedItemQuantity = (id: number) => {
    let quantity = 0;
    fetchedItems.map((item) => {
      if (item.itemId === id) {
        quantity = item.quantity;
      }
    });
    return quantity;
  };
  const fetchRequiredData = () => {
    fetchCustomers();
    fetchShopTypes();
    fetchShops();
    fetchItems();
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

  useEffect(() => {
    fetchRequiredData();
  }, []);
  if (
    !shopTypesFetched ||
    !shopsFetched ||
    !itemsFetched ||
    !customersFetched ||
    loading
  )
    return <div>Loading...</div>;

  return (
    <>
      <form className="billForm" onSubmit={handleSubmit}>
        <div className="box box1">
          <div className="title">
            <h1>Bill</h1>
          </div>
          <div className="billAttributes">
            <span className="billPaymentInfo">
              <h5>Total: {calculateTotalBillAmount()}</h5>
              <h6>Paid: {paymentAmount ? paymentAmount : 0}</h6>
              <h6>ChequeNo: {cheque.chequeNo}</h6>
            </span>
            <div className="billCustomerInfo">
              <h5>
                <CustomerBillPopupComponent
                  customers={customers}
                  shops={shops}
                  shopTypes={shopTypes}
                  setNewCustomer={setNewCustomer}
                  newCustomer={newCustomer}
                  setNewShop={setNewShop}
                  newShop={newShop}
                  setLocalCustomer={setLocalCustomer}
                  localCustomer={localCustomer}
                  resetCustomerAndShopData={resetCustomerAndShopData}
                  setSelectedCustomerIndex={setSelectedCustomerIndex}
                  selectedCustomerIndex={selectedCustomerIndex}
                  setSelectedCustomerId={setSelectedCustomerId}
                  selectedShopTypeIndex={selectedShopTypeIndex}
                  setSelectedShopIndex={setSelectedShopIndex}
                  setSelectedShopTypeIndex={setSelectedShopTypeIndex}
                  selectedShopIndex={selectedShopIndex}
                  setShopEmailId={setShopEmailId}
                  setShopName={setShopName}
                  setShopAddress={setShopAddress}
                  setShopPhoneNumber={setShopPhoneNumber}
                  setShopType={setShopType}
                  shopAddress={shopAddress}
                  shopEmailId={shopEmailId}
                  shopPhoneNumber={shopPhoneNumber}
                  shopName={shopName}
                  setEmailId={setEmailId}
                  emailId={emailId}
                  setPhoneNumber={setPhoneNumber}
                  phoneNumber={phoneNumber}
                  setCustomerName={setCustomerName}
                  customerName={customerName}
                />
              </h5>
              <h5>
                <PaymentPopupComponent
                  paymentAmount={paymentAmount}
                  setPaymentAmount={setPaymentAmount}
                  cheque={cheque}
                  setCheque={setCheque}
                />
              </h5>
            </div>
          </div>
          <table className="table table-hover table-sm">
            <thead>
              <tr className="custom-cell">
                <th scope="col" style={{ width: "400px" }}>
                  Size / Material
                </th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="custom-cell" style={{ width: "350px" }}>
                    {item.selectedItemId !== -1 ? (
                      <span style={{ alignItems: "center" }}>
                        {item.description}
                      </span>
                    ) : (
                      <AsyncSelect
                        cacheOptions
                        defaultOptions={getItems()}
                        loadOptions={loadOptions}
                        placeholder="Search..."
                        onChange={(option) => handleSelectChange(option, index)}
                      />
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => {
                        handleQuantityChange(e, index);
                      }}
                      style={{ width: "130px" }}
                      max={
                        item.selectedItemId === -1
                          ? Infinity
                          : getSelectedItemQuantity(item.selectedItemId)
                      }
                    />
                    <br />
                    <span style={{ fontSize: "12px" }}>
                      Left:{" "}
                      {item.selectedItemId === -1
                        ? 0
                        : getSelectedItemQuantity(item.selectedItemId)}
                    </span>
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => {
                        handlePriceChange(e, index);
                      }}
                      style={{ width: "130px" }}
                    />
                  </td>
                  <td>
                    <input
                      disabled
                      type="number"
                      placeholder="Total"
                      value={
                        (item.price ? item.price : 0) *
                        (item.quantity ? item.quantity : 0)
                      }
                      style={{ width: "130px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      type="button"
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
        </div>
        {/*        <div className="box box2">
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
              style={{ fontSize: "14px" }}
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
        <div className="box box3">
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
                  </div>*/}
      </form>
    </>
  );
};

export default BillForm;
