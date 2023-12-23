// AppRoutes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteObject } from "react-router";

// Import your route components here
import Overview from "./content/overview";
import Crypto from "./content/dashboards/Crypto";
import Messenger from "./content/applications/Messenger";
//import routes from "./router";

// ... and so on for other components

interface AppRoutesProps {
  routes: RouteObject[]; // Pass the routes array as a prop
}

const AppRoutes: React.FC<AppRoutesProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
