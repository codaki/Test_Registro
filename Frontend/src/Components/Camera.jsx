import axios from "axios";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

// eslint-disable-next-line react/prop-types
function Camera({ onCapture }) {
  const webcamRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState("");

  const captureAndSend = async () => {
    setResponseMessage("");
    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    // Capturar la hora y fecha actual cuando se presiona el botón
    const date = new Date();
    const currentDate = date.toISOString().split("T")[0];
    const currentTime = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // Pasar la fecha y hora al componente padre

    try {
      // First API call for face recognition
      const recognitionResponse = await axios.post(
        "http://localhost:3000/api/reconocer",
        {
          image: imageSrc.split(",")[1],
        }
      );

      if (recognitionResponse.data.error) {
        setResponseMessage("Error: " + recognitionResponse.data.error);
      } else {
        const professorId = recognitionResponse.data.ID;
        console.log("ID:", professorId);

        try {
          const horarioResponse = await axios.get(
            `http://localhost:3000/api/profesores/${professorId}/horario-actual`
          );
          onCapture(currentDate, currentTime, horarioResponse.data);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setResponseMessage(error.response.data.message);
          } else {
            setResponseMessage("Error al obtener el horario del profesor");
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error en el proceso de reconocimiento");
    }
  };

  return (
    <div className="flex flex-col items-center lg:width-1/2 md:w-3/4 w-full mx-auto">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={800} // Se muestra más grande en pantalla
        height={600}
        screenshotWidth={400} // Se captura con un tamaño más pequeño
      />
      <button
        onClick={captureAndSend}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Detección
      </button>
      <p className="mt-2 text-lg text-gray-800">{responseMessage}</p>
    </div>
  );
}

export default Camera;
