import axios from "axios";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

function Camera() {
  const webcamRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState("");

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    try {
      const response = await axios.post("http://localhost:3000/api/reconocer", {
        image: imageSrc.split(",")[1], // Eliminar prefijo 'data:image/jpeg;base64,'
      });

      if (response.data.error) {
        setResponseMessage("Error: " + response.data.error);
      } else {
        setResponseMessage(
          `ID: ${response.data.id}, Nombre: ${response.data.name}`
        );
      }
    } catch (error) {
      setResponseMessage("Error en la comunicación con el servidor." + error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        height={300}
      />
      <button
        onClick={captureAndSend}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Capturar y Enviar
      </button>
      <p className="mt-2 text-lg text-gray-800">{responseMessage}</p>
    </div>
  );
}

export default Camera;
