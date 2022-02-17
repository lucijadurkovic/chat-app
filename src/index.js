import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import SignIn from "./components/SignIn";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunkMiddleware)); //OVO MAKNI AKO SE NEĆE KORISTITI

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/General" element={<App room="General" />} />
        <Route path="/Games" element={<App room="Games" />} />
        <Route path="/Sport" element={<App room="Sport" />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
