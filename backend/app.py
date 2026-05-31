from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Load model and feature columns
model_path = os.path.join(os.path.dirname(__file__), '../model/house_model.pkl')
features_path = os.path.join(os.path.dirname(__file__), '../model/feature_columns.pkl')

model = joblib.load(model_path)
feature_columns = joblib.load(features_path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Create empty dataframe with all feature columns
        input_df = pd.DataFrame(0, index=[0], columns=feature_columns)
        
        # Fill in the values user provided
        input_df['GrLivArea'] = data.get('GrLivArea', 0)
        input_df['BedroomAbvGr'] = data.get('BedroomAbvGr', 0)
        input_df['FullBath'] = data.get('FullBath', 0)
        input_df['GarageArea'] = data.get('GarageArea', 0)
        input_df['YearBuilt'] = data.get('YearBuilt', 0)
        input_df['OverallQual'] = data.get('OverallQual', 0)
        input_df['TotalBsmtSF'] = data.get('TotalBsmtSF', 0)
        input_df['LotArea'] = data.get('LotArea', 0)

        prediction = model.predict(input_df)
        return jsonify({'predicted_price': round(float(prediction[0]), 2)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)