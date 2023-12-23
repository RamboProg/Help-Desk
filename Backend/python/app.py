from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from joblib import dump, load
import pandas as pd
import os

app = Flask(__name__)
# app.config["JWT_SECRET"] = "0f6738513cbdeb7f0f7ed741182698acac6b992fe54fa5fb21866e0b27d556d1"  # Replace with your secret key
# jwt = JWTManager(app)
CORS(app)
# Load dataset
def load_data(): 
    df = pd.read_csv('../python/agentData.csv')
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
# def load_model_and_encoders():
#     if os.path.exists('Backend/python/rf_classifier.joblib'):
#         rf_classifier = load('Backend/python/rf_classifier.joblib')
#         priority_encoder = load('Backend/python/priority_encoder.joblib')
#         type_encoder = load('Backend/python/type_encoder.joblib')
#         agent_encoder = load('Backend/python/agent_encoder.joblib')
#     else:
#         df = load_data()
#         rf_classifier, priority_encoder, type_encoder, agent_encoder = train_model(df)

#         dump(rf_classifier, 'Backend/python/rf_classifier.joblib')
#         dump(priority_encoder, 'Backend/python/priority_encoder.joblib')
#         dump(type_encoder, 'Backend/python/type_encoder.joblib')
#         dump(agent_encoder, 'Backend/python/agent_encoder.joblib')

#     return rf_classifier, priority_encoder, type_encoder, agent_encoder


def load_model_and_encoders():
    base_path = os.path.dirname(os.path.abspath(__file__))
    rf_model_path = os.path.join(base_path, 'rf_classifier.joblib')
    priority_encoder_path = os.path.join(base_path, 'priority_encoder.joblib')
    type_encoder_path = os.path.join(base_path, 'type_encoder.joblib')
    agent_encoder_path = os.path.join(base_path, 'agent_encoder.joblib')
    
    if os.path.exists(rf_model_path):
        rf_classifier = load(rf_model_path)
        priority_encoder = load(priority_encoder_path)
        type_encoder = load(type_encoder_path)
        agent_encoder = load(agent_encoder_path)    
    else:
        df = load_data()
        rf_classifier, priority_encoder, type_encoder, agent_encoder = train_model(df)

        dump(rf_classifier, rf_model_path)
        dump(priority_encoder, priority_encoder_path)
        dump(type_encoder, type_encoder_path)
        dump(agent_encoder, agent_encoder_path)

    return rf_classifier, priority_encoder, type_encoder, agent_encoder




rf_classifier, priority_encoder, type_encoder, agent_encoder = load_model_and_encoders()

@app.route('/predict', methods=['POST'])
# @jwt_required()

def predict():
    data = request.get_json()
    app.logger.info('Received data: %s', data)
    try:
        priority_encoded = priority_encoder.transform([data['Priority']])
        type_encoded = type_encoder.transform([data['Type']])
    except KeyError as e:
        return jsonify({'error': f'Missing data for {e}'}), 400
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

    # Predict probabilities
    probabilities = rf_classifier.predict_proba([[priority_encoded[0], type_encoded[0]]])[0]
    # Map probabilities to agent names
    agent_probabilities = dict(zip(agent_encoder.classes_, probabilities))

    return jsonify({'agent_probabilities': agent_probabilities})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

    





