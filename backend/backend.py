from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/helloworld', methods=['GET'])
def test():
    return "Hello World"

@app.route('/hello', methods=['GET'])
def test_2():
    return f"Hello, {request.args.get('name', default='anonymous', type=str)}!"

app.run()