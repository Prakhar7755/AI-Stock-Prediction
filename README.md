# 📈 AI Stock Predictor Web App

An AI-powered stock prediction platform built with the **MERN stack** + **Flask ML microservice**.  
Users can search for companies, visualize stock trends, and get predictive insights using machine learning models trained on historical stock data.

---

## 🔗 Project Links

- **Code Repository:** [GitHub](https://github.com/Prakhar7755/AI-Stock-Prediction)  
- **Live Website:** [Render Deployment](https://ai-stock-prediction-ml-service-1.onrender.com/health)  
- **Demo Video:** [Google Drive](https://drive.google.com/file/d/1Uzq5FFI_bJI5RlrJUe-yb9VJWc9CC8N7/view)  

---

## 🚀 Features

- 🔐 **REST API Backend (Express.js)** — manages stock/company records and connects to the ML service.  
- 📊 **Stock Prediction Engine (Flask + scikit-learn)** — trained on Yahoo Finance data for time-series forecasting.  
- 🌐 **Responsive UI (React + Tailwind + DaisyUI)** — clean charts, predictions, and company info display.  
- 📈 **Dynamic Data Visualization (Chart.js + React-ChartJS-2)**.  
- 🐳 **Dockerized Services** — separate containers for MERN app and ML microservice.  
- ⚡ **Deployed on Render.com** with GitHub-integrated CI/CD.  

---

## 🛠 Tech Stack

**Frontend**  
- React 19, React Router v7  
- TailwindCSS + DaisyUI  
- Chart.js (via react-chartjs-2)  
- Vite  

**Backend**  
- Node.js, Express.js  
- Sequelize + PostgreSQL (company data)  
- MongoDB (historical stock storage)  
- Yahoo Finance API wrapper (`yahoo-finance2`)  
- Helmet, CORS  

**Machine Learning Service**  
- Flask  
- scikit-learn  
- Deployed separately as a microservice  

**DevOps & Deployment**  
- Docker (multi-stage build)  
- Render.com (Frontend + Backend + ML Service)  
- GitHub Actions / CI-CD (Render integration)  

---

## 📸 demo

> https://drive.google.com/file/d/1Uzq5FFI_bJI5RlrJUe-yb9VJWc9CC8N7/view

---

## ⚙️ Installation & Setup

### 1. Prerequisites

- Node.js v20+  
- Yarn package manager  
- MongoDB (local or cloud URI)  
- PostgreSQL database  
- Python 3.9+ (for ML service)  
- Docker (optional, for containerized deployment)

---

### 2. Clone Repository

```bash
git clone https://github.com/Prakhar7755/AI-Stock-Prediction.git
cd AI-Stock-Prediction
````

---

### 3. Install Dependencies

#### Root build (client + server)

```bash
yarn build
```

#### Or install separately

```bash
# Install backend
cd server
yarn install

# Install frontend
cd ../client
yarn install
```

---

### 4. Environment Variables

#### **Client (`client/.env`)**

```env
VITE_MODE=production
```

#### **Server (`server/.env`)**

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/stock-info
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
ML_SERVICE_URL=http://localhost:5002
```

> ⚠️ Ensure ML microservice is deployed separately and `ML_SERVICE_URL` points correctly.

---

### 5. Run Locally

#### Start backend

```bash
cd server
yarn dev
```

#### Start frontend

```bash
cd client
yarn dev
```

#### Build with Docker

```bash
docker build -t ai-stock-predictor .
docker run -p 5001:5001 ai-stock-predictor
```

---

## 🧑‍💻 Usage

1. Open the app in browser: `http://localhost:5173`
2. Search for a company or stock ticker.
3. View stock charts powered by **Yahoo Finance API**.
4. Navigate to **Predict Page** → select a company → get ML predictions.
5. View dynamic chart updates.

---

## 📡 API Endpoints

| Method | Endpoint           | Description                                    |
| ------ | ------------------ | ---------------------------------------------- |
| GET    | `/api/company`     | Get all stored companies                       |
| POST   | `/api/company`     | Add new company record                         |
| PUT    | `/api/company/:id` | Update company info by ID                      |
| POST   | `/api/stock`       | Fetch stock data from Yahoo Finance API        |
| POST   | `/api/predict`     | Send stock data to ML service → get prediction |

---

## 📦 Deployment

* **Render.com** hosts:

  * MERN backend (`/server`)
  * React frontend (`/client`)
  * Flask ML microservice (separate repo/service)
* CI/CD pipeline via **GitHub → Render integration**.
* Dockerized for reproducible builds.

---

## 🛠 Known Issues / Future Improvements

* 🔧 Improve ML prediction accuracy with deep learning models (LSTM/Transformers).
* 📊 Add multi-company comparison mode.
* 💾 Migrate MongoDB → PostgreSQL for unified persistence.
* 🔒 Enhance authentication (JWT/OAuth for user dashboards).
* 🌍 Add support for global stock exchanges (not just US tickers).

---

## 🤝 Contributing

1. Fork repo & create a feature branch (`git checkout -b feature/awesome-feature`)
2. Commit changes (`git commit -m 'Add awesome feature'`)
3. Push branch (`git push origin feature/awesome-feature`)
4. Open a Pull Request 🎉

---

## 📜 License

This project is licensed under the **MIT License**.

---

### ⭐ If you like this project, don’t forget to star the repo!

