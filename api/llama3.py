# Using flask to make an api
# import necessary libraries and functions
import ollama
from flask import Flask, Response, jsonify, request, stream_with_context
from flask_cors import CORS

# creating a Flask app
app = Flask(__name__)

CORS(app)

prompt = """
You are a cloud architect who is preparing for their Google 
Cloud Certification Cloud professional architect exam. 
You are given the below question.

Your company has decided to make a major revision of their API in order to create better experiences for their developers. They need to keep the old version of the API available and deployable, while allowing new customers and testers to try out the new API. They want to keep the same SSL and DNS records in place to serve both APIs.

What should they do?

A. Configure a new load balancer for the new version of the API

B. Reconfigure old clients to use a new endpoint for the new API

C. Have the old API forward traffic to the new API based on the path

D. Use separate backend pools for each API path behind the load balancer

Pick the correct option. Provide detailed explanation with examples for choosing that answer. Also provide explanation why you did not choose other options.
"""


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
