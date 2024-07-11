import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <App />
      </Provider>
    </RecoilRoot>
  </React.StrictMode>
);
