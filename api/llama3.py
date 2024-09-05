# Using flask to make an api
# import necessary libraries and functions
import ollama
from flask import Flask, Response, jsonify, request, stream_with_context
from flask_cors import CORS

# creating a Flask app
app = Flask(__name__)

CORS(app)


@app.route("/", methods=["GET"])
def home():
    return "Hello world", {"Content-Type": "text/plain"}


@app.route("/api/llama", methods=["POST"])
def query_ollama():

    prompt = request.json.get("prompt")

    def generate():
        stream = ollama.chat(
            model="llama3.1",
            messages=[{"role": "user", "content": prompt}],
            stream=True,
        )
        for chunk in stream:
            yield chunk["message"]["content"]

    return Response(
        stream_with_context(generate()),
        content_type="text/event-stream",
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
        },
    )


if __name__ == "__main__":
    app.run(port=5000)
