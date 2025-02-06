import axios from "axios";
import { useEffect, useState } from "react";
import Camera from "../Components/Camera";
import decc from "../assets/decc.png";
import entrada from "../assets/fondoRegistro.png";
import logoBlanco from "../assets/logoBlanco.png";

function RegistroAsistencia() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [captureDate, setCaptureDate] = useState("");
  const [captureTime, setCaptureTime] = useState("");
  const [professorInfo, setProfessorInfo] = useState(null);

  const handleRegistro = async () => {
    try {
      const registroData = {
        Profesor_ID: professorInfo.profesor_id,
        Hora: "11:25",
        Dia: captureDate,
        Lugar: professorInfo.edificio,
      };
      console.log(captureTime);
      const response = await axios.post(
        "http://localhost:3000/api/registros",
        registroData
      );

      if (response.status === 200 || response.status === 201) {
        alert("Registro exitoso");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar la asistencia");
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      // Format date
      setCurrentDate(
        date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );

      // Format time in local timezone
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

  // Función para actualizar la fecha y hora de captura
  const handleCapture = (date, time, professorData) => {
    setCaptureDate(date);
    setCaptureTime(time);
    setProfessorInfo(professorData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative w-full h-32">
        <img
          src={entrada}
          alt="Header Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-6">
          <img
            src={logoBlanco}
            alt="Logo Blanco"
            className="h-20 object-contain"
          />
          <img src={decc} alt="Logo DECC" className="h-20 object-contain" />
        </div>
      </div>

      {/* Barra verde con texto */}
      <div className="w-full bg-green-700 py-3 text-center text-white text-lg font-bold">
        REGISTRO DE PERMANENCIA
      </div>

      {/* Main Content */}
      <div className="flex flex-1 bg-gray-100 p-8 gap-8 justify-center">
        {/* Left Section: Information Card */}
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
                  <strong>Hora Clase:</strong> {professorInfo.hora_ingreso} -{" "}
                  {professorInfo.hora_finalizacion}
                </p>
                <p>
                  <strong>Edificio:</strong> {professorInfo.edificio}
                </p>
                <p>
                  <strong>Aula:</strong> {professorInfo.aula}
                </p>
                <p>
                  <strong>NRC:</strong> {professorInfo.nrc}
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

        {/* Right Section: Camera with Time Overlay */}
        <div className="w-1/2 flex items-center justify-center relative">
          <Camera onCapture={handleCapture} />
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-lg">
            <p className="text-sm">Fecha: {currentDate}</p>
            <p className="text-sm">Hora: {currentTime}</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-red-500 h-2"></div>
      <div className="w-full bg-green-700 py-4 text-center text-white text-sm">
        © 2024 Universidad de las Fuerzas Armadas ESPE - © 2024 CIENCIAS DE LA
        COMPUTACIÓN.
      </div>
    </div>
  );
}

export default RegistroAsistencia;
