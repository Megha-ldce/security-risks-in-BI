# main.py

from flask import Flask, jsonify, request
from security import check_security_risks
from database import init_db

app = Flask(__BIrisktaker__)

# Initialize the database
init_db()

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Security Risks in BI Application!"})

@app.route('/api/security-check', methods=['POST'])
def security_check():
    data = request.json
    risks = check_security_risks(data)
    return jsonify({"security_risks": risks})

if __name__ == '__main__':
    app.run(debug=True)
