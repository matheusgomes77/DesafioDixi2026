import { useEffect, useState } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, foto, registrarPonto }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);

      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const weekday = now.toLocaleDateString("pt-BR", { weekday: "long" });

      setDate(`${weekday}, ${day}/${month}/${year}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Prévia da Marcação</h2>

         <div className="modal-content">
          <div className="modal-photo">
            {foto ? (
              <img src={foto} alt="Foto capturada" className="modal-img" />
            ) : (
              <div className="modal-no-photo">📷</div>
            )}
          </div>

          <div className="modal-info">
            <p className="modal-date">{date}</p>
            <p className="modal-time">{time}</p>
          </div>
        </div>

        <p className="modal-question">
          Você deseja registrar este ponto?
        </p>

        <div className="modal-buttons">
          <button className="btn-secondary" onClick={onClose}>
            Tirar outra foto
          </button>

          <button
            className="btn-primary"
            onClick={() => {
              registrarPonto();
              onClose();
            }}
          >
            Registrar Ponto
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
