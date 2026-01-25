import { useEffect, useRef, useState } from "react";
import "./Home.css";
import Modal from "../components/Modal/Modal";

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [usarFoto, setUsarFoto] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const canvasRef = useRef(null);

  // CAPTURAR FOTO
  const capturarFoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL("image/png");
    setFotoCapturada(imageBase64);
  };

  // RELÓGIO HOME
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR"));
      setDate(now.toLocaleDateString("pt-BR"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // CAMERA
  useEffect(() => {
    if (usarFoto) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(() => {
          alert("Não foi possível acessar a câmera");
          setUsarFoto(false);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }
  }, [usarFoto]);

  // FECHAR MODAL + RESETAR TUDO
  const handleCloseModal = () => {
    setShowModal(false);
    setFotoCapturada(null); // limpa foto
  };

  // BACKEND
  const registrarPonto = async () => {
    try {
      const response = await fetch("http://localhost:8080/pontos?fotoPath=", {
        method: "POST"
      });
      const data = await response.json();
      return data;
    } catch {
      return { valido: false };
    }
  };

  return (
    <main className="home">
      <h1>Bater Ponto</h1>
      <p className="subtitle">Registre o ponto no sistema.</p>

      <div className="card">
        {/* CAMERA */}
        <div className="camera-box">
          <p className="camera-text">Centralize o rosto na moldura.</p>

          <div className="camera-frame">
            {usarFoto ? (
              <video ref={videoRef} autoPlay playsInline />
            ) : (
              <div className="photo-disabled">Foto desabilitada</div>
            )}
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* INFO */}
        <div className="info-panel">
          <div className="clock">{time}</div>
          <div className="date">{date}</div>

          <div className="toggle">
            <input
              type="checkbox"
              checked={usarFoto}
              onChange={(e) => setUsarFoto(e.target.checked)}
            />
            <label>Tirar Foto para Bater Ponto</label>
          </div>

          <button
            className="register-btn"
            onClick={() => {
              if (usarFoto) capturarFoto();
              setShowModal(true);
            }}
          >
            Registrar Ponto
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        foto={fotoCapturada}
        registrarPonto={registrarPonto}
        usarFoto={usarFoto}   //
      />
    </main>
  );
}
