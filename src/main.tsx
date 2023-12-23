import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
//import { AuthProvider } from "./context/AuthProvider.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.tsx";
import { PersistGate } from "redux-persist/integration/react";

{
  /*<AuthProvider>
      <App />
</AuthProvider>*/
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
