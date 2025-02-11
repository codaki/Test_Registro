import os
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "imagenes_profesores"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Crear carpeta base si no existe

@app.route("/upload", methods=["POST"])
def upload_images():
    try:
        data = request.json
        profesor = data.get("profesor")
        imagenes = data.get("imagenes")

        if not profesor or not imagenes:
            return jsonify({"error": "Faltan datos"}), 400

        # Crear carpeta específica para el profesor
        carpeta_profesor = os.path.join(UPLOAD_FOLDER, profesor)
        os.makedirs(carpeta_profesor, exist_ok=True)

        # Guardar las imágenes
        for img in imagenes:
            nombre_archivo = os.path.join(carpeta_profesor, img["nombre"])
            with open(nombre_archivo, "wb") as f:
                f.write(base64.b64decode(img["data"]))

        return jsonify({"message": f"Imágenes guardadas en {carpeta_profesor}"}), 200

    except Exception as e:
        return jsonify({"error": f"Error en el servidor: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
