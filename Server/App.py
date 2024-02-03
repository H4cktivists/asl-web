#Import necessary libraries
from flask import Flask
from flask_socketio import SocketIO, emit



#Initialize the Flask app
app = Flask(__name__)
socketio = SocketIO(app=app, async_mode='threading')


@app.route('/')
def index():
    return 'hello'

# @socketio.on('connect')
# def handle_connect(json):
#     print("client connected")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)