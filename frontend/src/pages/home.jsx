import { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [webcamActive, setWebcamActive] = useState(false);

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

  const activateWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.getElementById("webcam");
        video.srcObject = stream;
        setWebcamActive(true);
      })
      .catch(() => {
        alert("Não foi possível acessar a webcam.");
      });
  };

  return (
    <main className="main">
      <h1>Bater Ponto</h1>
      <p className="subtitle">Registre o ponto no sistema.</p>

      <div className="clock">{time}</div>
      <div className="date">{date}</div>

      <div className="webcam-container">
        {!webcamActive && (
          <>
            <img
              src="https://img.icons8.com/ios-filled/100/cccccc/no-video.png"
              alt="webcam off"
            />
            <p className="error-msg">
              Não foi possível acessar a webcam!
              <br />
              Altere as permissões do navegador.
            </p>
          </>
        )}

        <video id="webcam" autoPlay style={{ display: webcamActive ? "block" : "none" }} />

        <button onClick={activateWebcam}>Ativar Permissão</button>

        <div className="toggle">
          <input type="checkbox" defaultChecked />
          <label>Tirar Foto para Bater Ponto</label>
        </div>
      </div>
    </main>
  );
}
