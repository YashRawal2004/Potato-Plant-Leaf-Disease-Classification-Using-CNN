
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

# CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with ["http://localhost:5500"] if using Live Server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def convertToImage(data):
    img = np.array(Image.open(BytesIO(data)))
    return img

# Load your trained model
model = tf.keras.models.load_model(r'../models/my_model.keras')
class_labels = ['Early Blight', 'Late Blight', 'Healthy']  # Class names

@app.get('/ping')
async def ping():
    return {"message": "Hello, I'm alive"}

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    image = convertToImage(await file.read())
    image = np.expand_dims(image, 0)  # Convert to batch
    prediction = model.predict(image, verbose=0)[0]
    predicted_label = class_labels[np.argmax(prediction)]
    confidence = np.round(np.max(prediction) * 100, 2)
    return {'class': predicted_label, 'confidence': float(confidence)}

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8080)
