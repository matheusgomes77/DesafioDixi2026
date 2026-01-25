import { useEffect, useState } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, foto, registrarPonto, usarFoto }) {
  const [time, setTime] = useState({ full: "", seconds: "" });
  const [dateInfo, setDateInfo] = useState({ day: "", fullDate: "" });
  const [sucesso, setSucesso] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // RELÓGIO E DATA EM TEMPO REAL
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const now = new Date();

      const hhmm = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });

      const ss = String(now.getSeconds()).padStart(2, "0");

      const weekday = now.toLocaleDateString("pt-BR", { weekday: "long" });
      const formattedDate = now.toLocaleDateString("pt-BR");

      setTime({ full: hhmm, seconds: ss });
      setDateInfo({
        day: weekday.charAt(0).toUpperCase() + weekday.slice(1),
        fullDate: formattedDate
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // RESET QUANDO ABRE
  useEffect(() => {
    if (isOpen) {
      setSucesso(false);
      setMensagem("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRegistrar = async () => {
    const data = await registrarPonto();

    if (data) {
      setSucesso(true);
      setMensagem("Ponto registrado com sucesso.");
    } else {
      setMensagem("Erro ao registrar ponto.");
    }
  };

  const semFoto = !foto;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <button className="modal-close-x" onClick={onClose}>×</button>

        <h2 className="modal-title">
          {sucesso ? "Ponto Registrado!" : "Prévia da Marcação"}
        </h2>

        {/* ===== SEM FOTO ===== */}
        {semFoto ? (
          <div className="modal-body no-photo-layout">
            <p className="modal-weekday">{dateInfo.day}</p>

            <div className="modal-clock-display">
              <span className="modal-hhmm">{time.full}</span>
              <span className="modal-ss">{time.seconds}</span>
            </div>

            <p className="modal-fulldate">{dateInfo.fullDate}</p>

            {sucesso && <p className="modal-success-big">{mensagem}</p>}
          </div>
        ) : (
          /* ===== COM FOTO ===== */
          <div className="modal-body">
            <div className="modal-photo-section">
              <img src={foto} alt="Captura" className="modal-img-preview" />
            </div>

            <div className="modal-info-section">
              <p className="modal-weekday">{dateInfo.day}</p>

              <div className="modal-clock-display">
                <span className="modal-hhmm">{time.full}</span>
                <span className="modal-ss">{time.seconds}</span>
              </div>

              <p className="modal-fulldate">{dateInfo.fullDate}</p>

              <p className="modal-instruction">
                {sucesso ? mensagem : "Você deseja registrar esse ponto?"}
              </p>
            </div>
          </div>
        )}

        {/* ===== BOTÕES ===== */}
        <div className="modal-footer">
          {!sucesso ? (
            <>
              {/* 🔥 REGRA FINAL AQUI */}
              <button className="btn-retry" onClick={onClose}>
                {usarFoto ? "🔄 Tirar outra foto" : "🔄 Tentar novamente"}
              </button>

              <button className="btn-confirm" onClick={handleRegistrar}>
                ✓ Registrar Ponto
              </button>
            </>
          ) : (
            <button className="btn-close-final" onClick={onClose}>
              Fechar
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Modal;
