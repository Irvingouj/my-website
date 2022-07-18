import "./App.css";
import TopNavBar from "./components/TopNavBar/TopNavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import Home from "./Home";
import BlogPage from "./components/BlogPage/BlogPage";
import BlogDetail from "./components/BlogDetail/BlogDetail";


function App() {
  return (
    <Router>
      <div>
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/BlogPage" element={<BlogPage/>}/>
          <Route path="/BlogPage/:id" element={<BlogDetail/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
