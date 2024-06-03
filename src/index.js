import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { React } from "react";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <Provider store={store}>
    <App></App>
  </Provider>

)



