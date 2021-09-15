from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/helloworld', methods=['GET'])
def test():
    return "Hello World"

app.run()