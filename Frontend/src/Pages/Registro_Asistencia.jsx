import Camera from "../Components/Camera";
import decc from "../assets/decc.png";
import entrada from "../assets/fondoRegistro.png";
import logoBlanco from "../assets/logoBlanco.png";

function RegistroAsistencia() {
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
            <p>
              <strong>Nombre:</strong> Christopher Daniel Iza Miniguano
            </p>
            <p>
              <strong>Hora:</strong> 19:05
            </p>
            <p>
              <strong>Fecha:</strong> 29/11/2024
            </p>
            <p>
              <strong>Materia:</strong> Estructura de Datos
            </p>
            <p>
              <strong>Aula:</strong> G200
            </p>
          </div>
          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Registro Exitoso
          </button>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <Camera />
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
