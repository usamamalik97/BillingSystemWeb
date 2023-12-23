import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BillDetails from "./components/DetailComponents/BillDetails";
import CustomerDetails from "./components/DetailComponents/CustomerDetails";
import Home from "./pages/home/Home";
import Customers from "./pages/lists/customers/Customers";
import Products from "./pages/lists/products/Products";
import Bills from "./pages/lists/bills/Bills";
import Product from "./pages/details/product/Product";
import SignOut from "./pages/signout/SignOut";
import BillForm from "./pages/forms/billForm/BillForm";
import ProductForm from "./pages/forms/productForm/ProductForm";

const EmployeeApplicationRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signout/" element={<SignOut />} />
        <Route path="/home" element={<Home />} />
        {/* Products */}
        <Route path="/products/" element={<Products />} />
        <Route path="/products/add/" element={<ProductForm />} />
        <Route path="/products/:productId/" element={<Product />} />
        {/* Bills */}
        <Route path="/bills/" element={<Bills />} />
        <Route path="/bill/add/" element={<BillForm />} />
        <Route path="/bill/details/:billId/" element={<BillDetails />} />

        {/* Customers */}
        <Route path="/customers/" element={<Customers />} />
        <Route path="/customers/:customerId/" element={<CustomerDetails />} />
      </Routes>
    </Router>
  );
};

export default EmployeeApplicationRouter;
