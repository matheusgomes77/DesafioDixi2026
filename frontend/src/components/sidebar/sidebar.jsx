import "./Sidebar.css";

export default function Sidebar({ onChangePage }) {
  return (
    <aside className="sidebar">
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
