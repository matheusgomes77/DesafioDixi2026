import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./page/home.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      <Sidebar onChangePage={setPage} />
      {page === "home" && <Home />}
    </div>
  );
}

export default App;
