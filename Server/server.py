import os
import cv2
import numpy as np
import pickle
import base64
import io
from PIL import Image
from deepface import DeepFace
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configuración
UPLOAD_FOLDER = "imagenes_profesores"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Crear carpeta base si no existe

# Cargar el modelo y el label encoder
with open("deepface_model_VGG_Renombrado_completo.pkl", "rb") as f:
    model, label_encoder = pickle.load(f)

# Cargar OpenCV Haar Cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

app = Flask(__name__)
CORS(app)


def recognize_face(image):
    """Procesa la imagen, detecta el rostro y devuelve el ID y nombre solo si la confianza es >= 70%."""
    try:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=7, minSize=(50, 50))

        if len(faces) == 0:
            return {"error": "No se detectó ningún rostro"}

        for (x, y, w, h) in faces:
            face = image[y:y + h, x:x + w]
            face_rgb = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)

            embedding = DeepFace.represent(face_rgb, model_name="VGG-Face", enforce_detection=False)[0]["embedding"]

            predicted_probs = model.predict_proba([embedding])[0]
            predicted_label = int(np.argmax(predicted_probs))
            predicted_name = str(label_encoder.inverse_transform([predicted_label])[0])
            confidence_score = float(predicted_probs[predicted_label] * 100)

            if confidence_score >= 70.0:
                return {"ID": predicted_name, "confidence": confidence_score}
            else:
                return {"error": "La confianza es inferior al 70%"}
    except Exception as e:
        return {"error": f"Error en el reconocimiento facial: {str(e)}"}


@app.route("/recognize", methods=["POST"])
def recognize():
    """Recibe una imagen en Base64, la decodifica y la procesa."""
    try:
        data = request.json
        image_data = base64.b64decode(data["image"])
        image = Image.open(io.BytesIO(image_data))
        image = np.array(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        result = recognize_face(image)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Error en el procesamiento: {str(e)}"})


@app.route("/upload", methods=["POST"])
def upload_images():
    """Guarda imágenes en una carpeta específica para cada profesor."""
    try:
        data = request.json
        profesor = data.get("profesor")
        imagenes = data.get("imagenes")

        if not profesor or not imagenes:
            return jsonify({"error": "Faltan datos"}), 400

        carpeta_profesor = os.path.join(UPLOAD_FOLDER, profesor)
        os.makedirs(carpeta_profesor, exist_ok=True)

        for img in imagenes:
            nombre_archivo = os.path.join(carpeta_profesor, img["nombre"])
            with open(nombre_archivo, "wb") as f:
                f.write(base64.b64decode(img["data"]))

        return jsonify({"message": f"Imágenes guardadas en {carpeta_profesor}"}), 200

    except Exception as e:
        return jsonify({"error": f"Error en el servidor: {str(e)}"}), 500


@app.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Server is running"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
