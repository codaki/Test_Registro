import PropTypes from "prop-types";

function Modal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Registro Exitoso
        </h2>
        <p className="mt-4 text-gray-700">
          La asistencia ha sido registrada correctamente.
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
