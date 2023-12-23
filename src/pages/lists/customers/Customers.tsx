import "./customers.scss";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomerPaymentPopupComponent from "../../popup/customerPaymentPopup/CustomerPaymentPopupComponent";
//import PaymentPopup from "../../popup/paymentDetailsPopup/PaymentPopup";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import { useSelector } from "react-redux";

import { RootState } from "../../../app/store";
import PaymentPopupComponent from "../../popup/paymentDetailsPopup/PaymentPopupComponent";
import { Alert } from "@mui/material";

//import { customersList } from "../../../data";
const Customers = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [customers, setCustomers] = useState([]);
  const [customersBills, setCustomersBills] = useState([]);
  const [customersPaymentList, setCustomersPaymentList] = useState<any[]>([]);
  const [customerRemainingBalance, setCustomerRemainingBalance] = useState<
    any[]
  >([]);
  const [customerPayment, setCustomerPayment] = useState([
    {
      customerId: -1,
      paymentAmount: 0.0,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [warningText, setWarningText] = useState("");
  const getCustomerBills = (customerId: number) => {
    if (customersBills) {
      return customersBills[customerId] || [];
    }
    return [];
  };
  const getPendingBills = (customerId: number) => {
    let billCount = 0;
    const bill: any[] = getCustomerBills(customerId);
    if (bill) {
      bill.map((billTemp) => {
        if (parseFloat(billTemp.dueAmount) > 0) {
          billCount += 1;
        }
      });
    }
    return billCount;
  };
  const getPendingAmounts = (customerId: number) => {
    let pendingAmount = 0.0;
    const bill: any[] = getCustomerBills(customerId);
    if (bill) {
      bill.map((billTemp) => {
        pendingAmount += parseFloat(billTemp.dueAmount);
      });
    }
    return pendingAmount;
  };
  const getCustomersPaymentList = (customers: any[]) => {
    if (customers && customers.length > 0) {
      let customerPaymentList: any = [];
      customers.map((customer, index) => {
        customerPaymentList.push({
          cutomerId: customer.customerId,
          paymentAmount: 0,
          chequeNo: "",
          dueDate: "",
          bank: "",
          amount: 0,
        });
      });
      return customerPaymentList;
    }
    return [];
  };
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/customers/all/"
      );
      console.log("OBJ");
      console.log(response.data);
      setCustomers(response.data.customers);
      setCustomersBills(response.data.bills);
      setCustomersPaymentList(getCustomersPaymentList(response.data.customers));
      setCustomerRemainingBalance(response.data.customerRemainingBalance);
      setLoading(false);
    } catch (error) {
      setCustomers([]);
      setCustomersBills([]);
      setLoading(false);
    }
  };
  const addCustomerPayment = (customerId: number, paymentAmount: number) => {
    setCustomerPayment([
      ...customerPayment,
      {
        customerId: customerId,
        paymentAmount: paymentAmount,
      },
    ]);
  };
  const getCustomerPayment = (customerId: number) => {
    console.log(customerPayment);
    let customerPayment2;
    customerPayment.map((customerPayment) => {
      if (customerPayment.customerId === customerId) {
        customerPayment2 = customerPayment;
      }
    });
    if (!customerPayment2) {
      return {
        customerId: -1,
        paymentAmount: 0.0,
      };
    }
    console.log(customerPayment2);

    return customerPayment2;
  };
  const handleOnChangePayment = (customerId: number, paymentAmount: number) => {
    let customerPaymentExternal: { customerId: number; paymentAmount: number };
    customerPaymentExternal = getCustomerPayment(customerId);

    if (!customerPaymentExternal || customerPaymentExternal.customerId === -1) {
      addCustomerPayment(customerId, paymentAmount);
    } else {
      customerPaymentExternal.paymentAmount = paymentAmount;
    }
  };
  const handleAddCustomerPayment = (customerId: number, index: number) => {
    setWarningText("This alert is custom generated");
    setOpen(true);
    persistCustomerPaymentOrCheque(customersPaymentList[index], customerId);
  };

  const persistCustomerPaymentOrCheque = (
    customerPayment: any,
    customerId: number
  ) => {
    let formData = new URLSearchParams();

    formData.append(
      "Transaction",
      JSON.stringify({
        paymentAmount: customerPayment.paymentAmount,
      })
    );
    formData.append(
      "Customer",
      JSON.stringify({
        customerId: customerId,
      })
    );
    formData.append(
      "Cheque",
      JSON.stringify({
        chequeNo: customerPayment.chequeNo,
        dueDate: customerPayment.dueDate,
        bank: customerPayment.bank,
        amount: customerPayment.amount,
      })
    );
    formData.append(
      "User",
      JSON.stringify({
        username: user.username,
      })
    );
    axios
      .post(
        "http://localhost:8080/hassan-hardware/bills/addCustomerPayment",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        setCustomers(response.data.customers);
        setCustomersBills(response.data.bills);
        setCustomersPaymentList(
          getCustomersPaymentList(response.data.customers)
        );
        setCustomerRemainingBalance(response.data.customerRemainingBalance);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
        setLoading(false);
      });
  };
  const handleOnChangeSearch = async (value: string) => {
    try {
      const API =
        value && value.length > 0
          ? `http://localhost:8080/hassan-hardware/customers/search/${value}/`
          : "http://localhost:8080/hassan-hardware/customers/all/";
      const response = await axios.get(API);
      console.log(response.data);
      setCustomers(response.data.customers);
      setCustomersBills(response.data.bills);
      setCustomersPaymentList(getCustomersPaymentList(response.data.customers));
      setCustomerRemainingBalance(response.data.customerRemainingBalance);
      setLoading(false);
    } catch (error) {
      setCustomers([]);
      setCustomersBills([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleClose = (event) => {
    setOpen(false);
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="customers">
      <div
        className="addUser"
        style={{
          fontSize: "12px",
          alignItems: "center",
          alignSelf: "center",
          marginBottom: "0px",
          paddingBottom: "0px",
        }}
      >
        <a
          className="btn btn-primary btn-sm"
          href="/customer/add/"
          role="button"
        >
          <AddIcon />
          Add Customer
        </a>
      </div>
      <div
        className="searchCustomer"
        style={{
          alignItems: "center",
          alignSelf: "center",
          marginTop: "0px",
          paddingTop: "0px",
          marginLeft: "10px",
          marginBottom: "10px",
          width: "200px",
        }}
      >
        <input
          type="text"
          placeholder="Search Customer / Shop"
          style={{ width: "200px" }}
          onChange={(e) => handleOnChangeSearch(e.target.value)}
        />
      </div>
      <table className="table table-hover table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Shop Name</th>
            {user.role === "Admin" && <th scope="col">Phone Number</th>}
            <th scope="col">Pending Bills</th>
            <th scope="col">Pending Bills Amount</th>
            <th scope="col">Hold Amount</th>
            <th scope="col">Balance</th>
            <th scope="col">Add Payment</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {customers.map((customer, index) => (
            <tr key={customer.customerId} className={"table-light"}>
              <th
                scope="row"
                onClick={() =>
                  (window.location.href = `/customers/${customer.customerId}/`)
                }
              >
                {customer.customerName}
              </th>
              <td
                onClick={() =>
                  (window.location.href = `/shops/${customer.shop.shopId}/`)
                }
              >
                {customer.shopName}
              </td>
              {user.role === "Admin" && (
                <td
                  onClick={() =>
                    (window.location.href = `/customers/${customer.customerId}/`)
                  }
                >
                  {customer.phoneNumber}
                </td>
              )}
              <td
                onClick={() =>
                  (window.location.href = `/customers/${customer.customerId}/`)
                }
              >
                {getPendingBills(customer.customerId)}
              </td>
              <td
                onClick={() =>
                  (window.location.href = `/customers/${customer.customerId}/`)
                }
              >
                {getPendingAmounts(customer.customerId)}
              </td>

              <td
                onClick={() =>
                  (window.location.href = `/customers/${customer.customerId}/`)
                }
              >
                {customer.holdAmount}
              </td>
              <td
                onClick={() =>
                  (window.location.href = `/customers/${customer.customerId}/`)
                }
              >
                {customerRemainingBalance[customer.customerId]}
              </td>
              <td style={{ display: "flex", flexDirection: "row" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={5000} // Specify the duration in milliseconds (5 seconds in this example)
                  onClose={handleClose}
                >
                  <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    {warningText}
                  </Alert>
                </Snackbar>

                <PaymentPopupComponent
                  customerPayment={customersPaymentList[index]}
                />
                <CustomerPaymentPopupComponent
                  customerPayment={customersPaymentList[index]}
                />
              </td>
              <td>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={(e) =>
                    handleAddCustomerPayment(customer.customerId, index)
                  }
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Customers;
