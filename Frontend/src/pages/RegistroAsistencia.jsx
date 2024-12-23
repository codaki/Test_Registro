import React from "react";
import Camera from "../Components/Camera";
import entrada from "../assets/entrada.gif";
import logoBlanco from "../assets/logoBlanco.png";
import decc from "../assets/decc.png";

function RegistroAsistencia() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative w-full h-32 bg-black">
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
          <img
            src={decc}
            alt="Logo DECC"
            className="h-20 object-contain"
          />
        </div>
      </div>

            {/* Barra verde con texto */}
            <div className="w-full bg-green-700 py-2 text-center text-white text-lg font-bold">
        REGISTRO DE ASISTENCIA
      </div>

      {/* Main Content */}
      <div className="flex flex-1 bg-gray-100 p-6 gap-6">
        {/* Left Section: Information Card */}
        <div className="w-1/2 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Información de registro
          </h2>
        </div>

        {/* Right Section: Camera Component */}
        <div className="w-1/2 flex items-center justify-center">
          <Camera />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-red-500 h-2"></div>
      <div className="w-full bg-green-700 py-4 text-center text-white text-sm">
        © 2024 Universidad de las Fuerzas Armadas ESPE - © 2024 CIENCIAS DE LA
        COMPUTACIÓN.
      </div>
    </div>
  );
}

export default RegistroAsistencia;
