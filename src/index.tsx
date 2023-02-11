import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CanvasDrawer from "./components/CanvasDrawer/CanvasDrawer";
import About from "./components/about/about";
import GameWrapper from "./components/gameWrapper/gameWrapper";
import Chatbox from "./components/chatbox/chatbox";
import Contacts from "./components/contacts/contacts";
import LinksWrapper from "./components/LinksWrapper/LinksWrapper";
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

        <Route path="About" element={<About />} />
        <Route path="Game" element={<GameWrapper />} />
        <Route path="Chat" element={<Chatbox />} />
        <Route path="Links" element={<LinksWrapper />} />
        <Route path="Contact" element={<Contacts />} />
       
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
