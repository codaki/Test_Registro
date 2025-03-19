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
  const [isError, setIsError] = useState(false);

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
      setIsError(false);
      setShowModal(true);
    } catch (error) {
      console.error("Error al registrar:", error);
      setIsError(true);
      setShowModal(true);
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
      {/* Header */}
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

      {/* Título */}
      <div className="w-full bg-green-700 py-3 text-center text-white text-lg font-bold">
        REGISTRO DE ASISTENCIA A CLASES
      </div>

      {/* Contenedor Principal */}
      <div className="flex flex-1 bg-gray-100 p-8 gap-8 justify-center">
        {/* Información de Registro */}
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

        {/* Contenedor de Cámara y Hora */}
        <div className="w-1/2 flex flex-col items-center justify-center relative">
          {/* Nuevo Contenedor para la Fecha y Hora */}
          <div className="w-7/12 bg-green-700 text-white text-center p-4 rounded-lg mb-2 border-red-600 border-2">
            <p className="text-2xl font-bold">{currentTime}</p>
            <p className="text-lg">{currentDate}</p>
          </div>

          {/* Cámara */}
          <Camera onCapture={handleCapture} />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-red-500 h-2"></div>
      <div className="w-full bg-green-700 py-4 text-center text-white text-sm">
        © 2024 Universidad de las Fuerzas Armadas ESPE - CIENCIAS DE LA
        COMPUTACIÓN.
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={isError ? "Error de Registro" : "¡Registro Exitoso!"}
        message={
          isError
            ? "Ha ocurrido un error al registrar la asistencia. Por favor, intente nuevamente."
            : `Se ha registrado la asistencia de ${
                professorInfo?.nombre1 || ""
              } ${professorInfo?.apellido1 || ""} correctamente.`
        }
      />
    </div>
  );
}

export default RegistroAsistencia;
