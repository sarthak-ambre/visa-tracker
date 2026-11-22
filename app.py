import json
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__)
CORS(app)

# Paste your free key from Google AI Studio here
client = genai.Client()

@app.route("/api/visa/<country>")
def get_visa(country):
    prompt = f"""
    Give me Indian tourist visa requirements for {country}.
    Return ONLY valid JSON with these exact keys:
    {{
        "name": "{country}",
        "type": "Visa type for Indian citizens",
        "fee": "Approximate fee in INR (₹)",
        "time": "Processing time",
        "docs": ["Doc 1", "Doc 2", "Doc 3", "Doc 4", "Doc 5"]
    }}
    """
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json")
    )
    return jsonify(json.loads(response.text))

if __name__ == "__main__":
    app.run(debug=True, port=5000)