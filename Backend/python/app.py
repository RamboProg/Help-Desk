from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from joblib import dump, load
import os

app = Flask(__name__)

# Load dataset
def load_data(): 
    df = pd.read_csv('Backend/python/generatedDataset.csv')
    return df

# Initialize and train model
def train_model(df):
    priority_encoder = LabelEncoder()
    type_encoder = LabelEncoder()
    agent_encoder = LabelEncoder()

    df['Priority_encoded'] = priority_encoder.fit_transform(df['Priority'])
    df['Type_encoded'] = type_encoder.fit_transform(df['Type'])
    df['Agent_encoded'] = agent_encoder.fit_transform(df['Agent'])

    X = df[['Priority_encoded', 'Type_encoded']]
    y = df['Agent_encoded']

    rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_classifier.fit(X, y)

    return rf_classifier, priority_encoder, type_encoder, agent_encoder

# Load model and encoders
def load_model_and_encoders():
    if os.path.exists('Backend/python/rf_classifier.joblib'):
        rf_classifier = load('Backend/python/rf_classifier.joblib')
        priority_encoder = load('Backend/python/priority_encoder.joblib')
        type_encoder = load('Backend/python/type_encoder.joblib')
        agent_encoder = load('Backend/python/agent_encoder.joblib')
    else:
        df = load_data()
        rf_classifier, priority_encoder, type_encoder, agent_encoder = train_model(df)

        dump(rf_classifier, 'Backend/python/rf_classifier.joblib')
        dump(priority_encoder, 'Backend/python/priority_encoder.joblib')
        dump(type_encoder, 'Backend/python/type_encoder.joblib')
        dump(agent_encoder, 'Backend/python/agent_encoder.joblib')

    return rf_classifier, priority_encoder, type_encoder, agent_encoder

rf_classifier, priority_encoder, type_encoder, agent_encoder = load_model_and_encoders()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    priority_encoded = priority_encoder.transform([data['Priority']])
    type_encoded = type_encoder.transform([data['Type']])

    prediction_encoded = rf_classifier.predict([[priority_encoded[0], type_encoded[0]]])
    predicted_agent = agent_encoder.inverse_transform(prediction_encoded)
    return jsonify({'agent': predicted_agent[0]})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

    





