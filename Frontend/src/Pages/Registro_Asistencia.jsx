import axios from "axios";
import { useEffect, useState } from "react";
import decc from "../assets/decc.png";
import entrada from "../assets/fondoRegistro.png";
import logoBlanco from "../assets/logoBlanco.png";
import Camera from "../Components/Camera";
import Modal from "../Components/Modal"; // Componente modal

function RegistroAsistencia() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [captureDate, setCaptureDate] = useState("");
  const [captureTime, setCaptureTime] = useState("");
  const [professorInfo, setProfessorInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      setCurrentDate(
        date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
      setCurrentTime(
        date.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCapture = (date, time, professorData) => {
    setCaptureDate(date);
    setCaptureTime(time);
    setProfessorInfo(professorData);
  };

  const handleRegistro = async () => {
    try {
      const registroData = {
        Profesor_ID: professorInfo.profesor_id,
        Hora: captureTime,
        Dia: captureDate,
        Lugar: professorInfo.edificio,
      };
      await axios.post("http://localhost:3000/api/registros", registroData);
      setShowModal(true);
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar la asistencia");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProfessorInfo(null); // Vaciar la información al cerrar el modal
    setCaptureDate("");
    setCaptureTime("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full h-32">
        <img
          src={entrada} // Ruta a tu imagen de fondo
          alt="Header Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-6">
          {/* Logo Blanco */}
          <img
            src={logoBlanco}
            alt="Logo Blanco"
            className="h-20 object-contain"
          />
          {/* DECC */}
          <img src={decc} alt="Logo DECC" className="h-20 object-contain" />
        </div>
      </div>
      <div className="w-full bg-green-700 py-3 text-center text-white text-lg font-bold">
        REGISTRO DE PERMANENCIA
      </div>
      <div className="flex flex-1 bg-gray-100 p-8 gap-8 justify-center">
        <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información de Registro
          </h2>
          <div className="bg-blue-900 text-white p-4 rounded-lg">
            {professorInfo ? (
              <>
                <p>
                  <strong>Nombre:</strong> {professorInfo.nombre1}{" "}
                  {professorInfo.apellido1}
                </p>
                <p>
                  <strong>Docente ID:</strong> {professorInfo.docente_id}
                </p>
                <hr className="my-2" />
                <p>
                  <strong>Hora de Captura:</strong> {captureTime}
                </p>
                <p>
                  <strong>Fecha de Captura:</strong> {captureDate}
                </p>
                <p>
                  <strong>Materia:</strong> {professorInfo.asignatura}
                </p>
                <p>
                  <strong>Edificio:</strong> {professorInfo.edificio}
                </p>
              </>
            ) : (
              <p>Esperando reconocimiento facial...</p>
            )}
          </div>
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            onClick={handleRegistro}
          >
            Registrar
          </button>
        </div>

        <div className="w-1/2 flex items-center justify-center relative">
          <Camera onCapture={handleCapture} />
          <div className="absolute top-4 right-4 bg-blue-900 text-white p-2 rounded-lg">
            <p className="text-sm">Fecha: {currentDate}</p>
            <p className="text-sm">Hora: {currentTime}</p>
          </div>
        </div>
      </div>{" "}
      {/* Footer */}
      <div className="w-full bg-red-500 h-2"></div>
      <div className="w-full bg-green-700 py-4 text-center text-white text-sm">
        © 2024 Universidad de las Fuerzas Armadas ESPE - © 2024 CIENCIAS DE LA
        COMPUTACIÓN.
      </div>
      <Modal show={showModal} onClose={handleCloseModal} />
    </div>
  );
}

export default RegistroAsistencia;
