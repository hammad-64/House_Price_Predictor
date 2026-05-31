import requests

test_data = {
    "GrLivArea": 1500,
    "BedroomAbvGr": 3,
    "FullBath": 2,
    "GarageArea": 400,
    "YearBuilt": 2000,
    "OverallQual": 7,
    "TotalBsmtSF": 800,
    "LotArea": 8000
}

response = requests.post("http://localhost:5000/predict", json=test_data)
print(response.json())