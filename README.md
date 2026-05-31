# 🏠 House Price Predictor

A full-stack machine learning web app that predicts house prices based on key property features, trained on the Ames, Iowa housing dataset from Kaggle.

## 🚀 Live Demo
> Screenshot:
![App Screenshot](screenshot.png)

## 🧠 How It Works
1. A **Random Forest model** is trained on 1,460 real homes from Ames, Iowa
2. The model achieves **89.42% accuracy (R² score)** with a mean error of ~$17,498
3. A **Flask backend** loads the saved model and exposes a `/predict` API endpoint
4. A **React + Vite frontend** takes user inputs and displays the predicted price

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Machine Learning | Python, Scikit-learn, Random Forest |
| Data Processing | Pandas, NumPy |
| Backend | Flask, Flask-CORS |
| Frontend | React, Vite |
| Model Storage | Joblib (.pkl) |

## 📁 Project Structure
House_Price_Predictor/
├── data/               # Kaggle dataset (not included in repo)
├── model/              # Saved .pkl files (not included in repo)
├── notebook/           # Jupyter notebook for training
│   └── house_price_predictor.ipynb
├── backend/            # Flask API
│   └── app.py
└── frontend/           # React + Vite UI
└── src/
└── App.jsx


## ⚙️ Setup & Run

### 1. Clone the repo
```bash
git clone https://github.com/hammad-64/House_Price_Predictor.git
cd House_Price_Predictor
```

### 2. Train the model
- Download dataset from [Kaggle](https://www.kaggle.com/c/house-prices-advanced-regression-techniques)
- Place `train.csv` in the `data/` folder
- Open `notebook/house_price_predictor.ipynb` and run all cells
- This saves `house_model.pkl` and `feature_columns.pkl` in the `model/` folder

### 3. Run the backend
```bash
cd backend
pip install flask flask-cors joblib numpy pandas scikit-learn
python app.py
```

### 4. Run the frontend
```bash
cd frontend
npm install
npm run dev
```

### 5. Open in browser
Go to `http://localhost:5173`

## 📊 Model Performance
- **R² Score:** 0.8942 (89.42% accuracy)
- **Mean Absolute Error:** $17,498
- **Algorithm:** Random Forest Regressor (100 trees)
- **Training samples:** 1,168 houses
- **Test samples:** 292 houses

## 📌 Features Used for Prediction
| Feature | Description |
|---|---|
| GrLivArea | Above ground living area (sq ft) |
| BedroomAbvGr | Number of bedrooms |
| FullBath | Number of full bathrooms |
| GarageArea | Garage size (sq ft) |
| YearBuilt | Year the house was built |
| OverallQual | Overall material and finish quality (1-10) |
| TotalBsmtSF | Total basement area (sq ft) |
| LotArea | Total lot size (sq ft) |

## 👨‍💻 Author
Built by **Hammad** as a portfolio ML project.
Dataset: [Kaggle - House Prices: Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques)