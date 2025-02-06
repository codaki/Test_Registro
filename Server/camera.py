import cv2
import numpy as np
import pickle
from deepface import DeepFace
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PIL import Image

# Cargar el modelo y el label encoder
with open("deepface_model_VGG_Renombrado_completo.pkl", "rb") as f:
    model, label_encoder = pickle.load(f)

# Cargar OpenCV Haar Cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

app = Flask(__name__)
CORS(app)

def recognize_face(image):
    """Procesa la imagen, detecta el rostro y devuelve el ID y nombre."""
    try:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=7, minSize=(50, 50))

        if len(faces) == 0:
            print("⚠️ No se detectó ningún rostro en la imagen.")
            return {"error": "No se detectó ningún rostro"}

        for (x, y, w, h) in faces:
            face = image[y:y + h, x:x + w]
            face_rgb = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)

            print("🧠 Extrayendo embedding con DeepFace...")

            embedding = DeepFace.represent(face_rgb, model_name="VGG-Face", enforce_detection=False)[0]["embedding"]

            print("✅ Embedding extraído correctamente.")

            predicted_probs = model.predict_proba([embedding])[0]
            predicted_label = int(np.argmax(predicted_probs))  # Convertir int64 a int
            predicted_name = str(label_encoder.inverse_transform([predicted_label])[0])  # Convertir a string
            confidence_score = float(predicted_probs[predicted_label] * 100)  # Convertir a float

            return {
                "ID": predicted_name,
                "confidence": confidence_score
            }

    except Exception as e:
        print(f"❌ Error en el reconocimiento facial: {str(e)}")
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
@app.route("/hello", methods=["GET"]) 
def hello():
    return jsonify({"message": "Server is running"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
