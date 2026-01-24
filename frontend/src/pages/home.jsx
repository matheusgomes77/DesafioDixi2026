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

// 🔹 FUNÇÃO PARA CAPTURAR FOTO
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
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);

      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      setDate(`${day} / ${month} / ${year}`);
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  // 🔹 LIGA / DESLIGA A CÂMERA
  useEffect(() => {
    if (usarFoto) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          alert("Não foi possível acessar a câmera");
          setUsarFoto(false);
        });
    } else {
      // Desliga a câmera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  }, [usarFoto]);

  const registrarPonto = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/pontos?fotoPath=",
        { method: "POST" }
      );

      const data = await response.json();

      alert(
        `Ponto ${data.valido ? "REGISTRADO" : "DESCONSIDERADO"}\n` +
        `Data/Hora: ${data.dataHora}`
      );
    } catch {
      alert("Erro ao registrar ponto");
    }
  };

  return (
    <main className="home">
      <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      videoRef={usarFoto ? videoRef : null}
      registrarPonto={registrarPonto}
    />
      <h1>Bater Ponto</h1>
      <p className="subtitle">Registre o ponto no sistema.</p>

      <div className="card">
        {/* CAMERA */}
        <div className="camera-box">
          <p className="camera-text">
            Centralize o rosto na moldura para tirar a foto.
          </p>

          <div className="camera-frame">
            {usarFoto ? (
              <video ref={videoRef} autoPlay playsInline />
            ) : (
              <div className="photo-disabled">
                Foto desabilitada
              </div>
            )}
          </div>
        </div>

        {/* 🔹 CANVAS INVISÍVEL (OBRIGATÓRIO PARA CAPTURAR A FOTO) */}
          <canvas ref={canvasRef} style={{ display: "none" }} />  

        {/* INFO */}
        <div className="info-panel">
          <div className="clock">{time}</div>
          <div className="date">{date}</div>

          <p className="info-text">
            A data e hora serão registradas no sistema ao realizar a marcação.
          </p>

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
        if (usarFoto) {
          capturarFoto();
    }
        setShowModal(true);
  }}
      >
        Registrar Ponto
      </button>

        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        foto={fotoCapturada}
        registrarPonto={registrarPonto}
      />

    </main>
  );
}
