import ApplicationRouter from "./routes";
//import NavbarCustom from "./components/navbar/NavbarCustom";

import "./CSS/global.scss";
import Footer from "./components/footer/Footer";
/*import { adminMenu, employeeMenu } from "./data";
import { useEffect, useState } from "react";
import EmployeeApplicationRouter from "./employeeRouter";
import Login from "./pages/login/Login";
import Counter from "./features/counter/Counter";
//import { useAuth } from "./context/AuthProvider";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";*/
//const { Footer } = Layout;

function App() {
  return (
    <div>
      <div className="App" style={{ marginBottom: "60px" }}>
        <ApplicationRouter />
        {/*isAuthenticated ? (
          isAdmin ? (
            <>
              <NavbarCustom menu={adminMenu} />
              <ApplicationRouter />
            </>
          ) : (
            <>
              <NavbarCustom menu={employeeMenu} />
              <EmployeeApplicationRouter />
            </>
          )
        ) : (
          <Login />
        )*/}
      </div>
      <Footer />
    </div>
  );
}

export default App;
