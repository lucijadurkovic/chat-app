import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import SignIn from "./components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import { createStore } from "redux";

const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/General" element={<App room="General" />} />
        <Route path="/Games" element={<App room="Games" />} />
        <Route path="/Sport" element={<App room="Sport" />} />
        <Route path="/Fashion" element={<App room="Fashion" />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
