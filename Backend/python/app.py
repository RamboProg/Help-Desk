from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from joblib import dump, load
import os

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "f063b61446d91de0f6cbad48d4d9868183fed7ed7aa11a2d28adc0f839f4ee01df602b85530327ce2b8c1e857c590d8496bd4a2c82cf39679fec02014bd7ed53"  # Replace with your secret key
jwt = JWTManager(app)

# Load dataset
def load_data(): 
    df = pd.read_csv('../python/agentData')
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
@jwt_required()

def predict():
    data = request.get_json()
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

if _name_ == '_main_':
    app.run(debug=True, port=3000)

    





