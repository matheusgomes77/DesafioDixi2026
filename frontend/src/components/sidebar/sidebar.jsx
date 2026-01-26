import "./Sidebar.css";
import logoDixi from "../../assets/logo-dixi.png";


export default function Sidebar({ onChangePage }) {
  return (
    <aside className="sidebar">

      {/* LOGO NO TOPO */}
      <div className="sidebar-logo">
        <img src={logoDixi} alt="Dixi Logo" />
      </div>

      <button onClick={() => onChangePage("home")}>
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/time-machine.png"
          alt="Bater Ponto"
        />
        Bater Ponto
      </button>

      <button onClick={() => onChangePage("historico")}>
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/document.png"
          alt="Histórico"
        />
        Histórico
      </button>

    </aside>
  );
}
