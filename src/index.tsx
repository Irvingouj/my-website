import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CanvasDrawer from "./components/CanvasDrawer/CanvasDrawer";
const DrawGraph = React.lazy(() => import("./pages/DrawGraph/DrawGraph"));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/DrawGraph" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <DrawGraph />
          </React.Suspense>
        } />
        <Route path="/CanvasDrawer" element={<CanvasDrawer/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
