import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItemForm from "./components/Forms/AddItemForm";
import Items from "./components/ListComponents/Items";
import ItemDetails from "./components/DetailComponents/ItemDetails";
import Home from "./pages/home/Home";
import BillsGraph from "./pages/Graphs/billsGraph/BillsGraph";
import Customers from "./pages/lists/customers/Customers";
import Products from "./pages/lists/products/Products";
import Shops from "./pages/lists/shops/Shops";
import User from "./pages/lists/users/User";
import Bills from "./pages/lists/bills/Bills";
import Product from "./pages/details/product/Product";
import AddUser from "./pages/forms/user/AddUser";
import CustomerForm from "./pages/forms/customerForm/CustomerForm";
import Login from "./pages/login/Login";
import SignOut from "./pages/signout/SignOut";
import BillForm from "./pages/forms/billForm/BillForm";
import ProductForm from "./pages/forms/productForm/ProductForm";
import BillDetails from "./pages/details/bill/Bill";
import CustomerDetail from "./pages/details/customer/CustomerDetail";
import ShopDetail from "./pages/details/shop/ShopDetail";
import RequireAuth from "./RequireAuth";
import RequireAdminAuth from "./RequireAdminAuth";
import Unauthenticated from "./Unauthenticated";
import NavbarCustom from "./components/navbar/NavbarCustom";
import { adminMenu, employeeMenu } from "./data";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import ExpenseForm from "./pages/forms/expenseForm/ExpenseForm";
import Expenses from "./pages/lists/expenses/Expenses";
import Cheques from "./pages/lists/cheques/Cheques";
import ProductsReport from "./pages/lists/reports/products/ProductsReport";
import Transactions from "./pages/lists/transactions/transactions";
import Payments from "./pages/lists/payments/Payments";
//import Bills from "./components/ListComponents/Bills";
//import CustomerDetails from "./components/DetailComponents/CustomerDetails";
//import ShopDetails from "./components/DetailComponents/ShopDetails";
//import Shops from "./components/ListComponents/Shops";
//import Sidebar from "./components/Sidebar/Sidebar";
//import BillForm from "./components/Forms/BillForm";
//import Customers from "./components/ListComponents/Customers";
//import Products from "./pages/products/Products";
/*import Dropdown from "./components/Dropdown";
import Form from "./components/Forms/Form";
import Navbar from "./components/navbar/NavbarCustom";
import SignInForm from "./components/Forms/SignInForm";
import RestComponent from "./components/RestComponent";*/
//import Home from "./components/Home";
//import CustomerForm from "./components/Forms/CustomerForm";
//import BillDetails from "./components/DetailComponents/BillDetails";
//import { useState } from "react";

const ApplicationRouter = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  let contentTemp;
  if (isAuthenticated) {
    contentTemp = (
      <NavbarCustom menu={user?.role === "Admin" ? adminMenu : employeeMenu} />
    );
  } else {
    contentTemp = <></>;
  }
  console.log("ContentCreated");
  console.log("ContentCreated");
  return (
    <>
      {contentTemp}
      <Router>
        <Routes>
          <Route element={<Unauthenticated />}>
            <Route path="/login/" element={<Login />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/products/" element={<Products />} />
            <Route path="/products/:productId/" element={<Product />} />
            <Route path="/bills/" element={<Bills />} />
            <Route path="/bill/add/" element={<BillForm />} />
            <Route path="/bills/:billId/" element={<BillDetails />} />
            <Route path="/customers/" element={<Customers />} />
            <Route path="/items/" element={<Items />} />
            <Route path="/signout/" element={<SignOut />} />

            <Route element={<RequireAdminAuth />}>
              <Route path="/expenses/add/" element={<ExpenseForm />} />
              <Route path="/expenses/" element={<Expenses />} />
              <Route path="/cheques/" element={<Cheques />} />
              <Route path="/reports/" element={<ProductsReport />} />
              <Route path="/payments/" element={<Payments />} />
              <Route path="/transactions/" element={<Transactions />} />
              <Route path="/products/add/" element={<ProductForm />} />
              <Route path="" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/shops/" element={<Shops />} />
              <Route path="/shops/:shopId/" element={<ShopDetail />} />
              <Route path="/items/:itemId/" element={<ItemDetails />} />
              <Route path="/items/add/" element={<AddItemForm />} />
              <Route path="/graphs/" element={<BillsGraph />} />
              <Route path="/users/" element={<User />} />
              <Route path="/users/add/" element={<AddUser />} />
              <Route path="/customer/add/" element={<CustomerForm />} />
              <Route
                path="/customers/:customerId/"
                element={<CustomerDetail />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default ApplicationRouter;
