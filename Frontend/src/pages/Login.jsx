import espe from "../assets/espe.png";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-3/4 md:w-2/3 lg:w-1/2">
        {/* Sección izquierda para la imagen */}
        <div className="w-1/2 bg-gray-200 rounded-l-lg hidden md:flex items-center justify-center">
          <img
            src={espe}
            alt="Login Illustration"
            className="h-80 w-60 object-cover"
          />
        </div>
        {/* Sección derecha para el formulario */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-600 font-medium mb-2"
              >
                Usuario
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
