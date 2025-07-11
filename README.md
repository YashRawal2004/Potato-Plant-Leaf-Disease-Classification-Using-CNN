# 🍃 Potato Leaf Disease Classification Using CNN

This project uses a **Convolutional Neural Network (CNN)** to classify potato leaf images into three categories:
- ✅ Healthy
- 🟠 Early Blight
- 🔴 Late Blight

It includes a **FastAPI backend** for image classification and a **frontend interface** for real-time predictions.

---

## 🌐 Live Demo

🔗 Try the deployed frontend here:  
**[https://magnificent-tartufo-82683a.netlify.app/](https://magnificent-tartufo-82683a.netlify.app/)**

---

## 📂 Project Structure

```
potato-leaf-disease-classification/
├── api/
│   └── main.py
├── Data/
│   ├── Potato___Early_blight/
│   ├── Potato___healthy/
│   └── Potato___Late_blight/
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── models/
│   ├── my_model.keras
│   └── my_modelv1.keras
├── notebook/
│   └── main.ipynb
├── requirements.txt
└── README.md
```

---

## 🛠️ How to Run This Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/potato-leaf-disease-classification.git
cd potato-leaf-disease-classification
```

### 2️⃣ Install Requirements

```bash
pip install -r requirements.txt
```

### 3️⃣ Start FastAPI Backend

```bash
cd api
uvicorn main:app --reload
```

Open your browser at:  
`http://127.0.0.1:8000`  
Swagger UI:  
`http://127.0.0.1:8000/docs`

### 4️⃣ Open Frontend in Browser

Navigate to the `frontend` folder and open `index.html` in your browser.

---