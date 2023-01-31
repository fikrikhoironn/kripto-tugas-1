from algorithm.affineCipher import affineEncrypt
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'This is my first API call!'

@app.route('/encrypt/affine', methods=["POST"])
def encrypt_affine():
  input_json = request.get_json(force=True)
  plaintext = input_json['plaintext']
  m = input_json['m']
  b = input_json['b']

  ciphertext = affineEncrypt(plaintext, m, b)

  return jsonify({"ciphertext": ciphertext})