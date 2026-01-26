import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/home/home";
import Historico from "./pages/historico/historico";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      <Sidebar onChangePage={setPage} />
      {page === "home" && <Home />}
      {page === "historico" && <Historico />}
    </div>
  );
}

export default App;
