from algorithm.affineCipher import affineDecrypt, affineEncrypt
from algorithm.playfairCipher import playfairDecrypt, playfairEncrypt
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

@app.route('/decrypt/affine', methods=["POST"])
def decrypt_affine():
  input_json = request.get_json(force=True)
  ciphertext = input_json['ciphertext']
  m = input_json['m']
  b = input_json['b']

  plaintext = affineDecrypt(ciphertext, m, b)

  return jsonify({"plaintext": plaintext})


@app.route('/encrypt/playfair', methods=["POST"])
def encrypt_playfair():
  input_json = request.get_json(force=True)
  plaintext = input_json['plaintext']
  key = input_json['key']

  ciphertext = playfairEncrypt(plaintext, key)

  return jsonify({"ciphertext": ciphertext})

@app.route('/decrypt/playfair', methods=["POST"])
def decrypt_playfair():
  input_json = request.get_json(force=True)
  ciphertext = input_json['ciphertext']
  key = input_json['key']

  plaintext = playfairDecrypt(ciphertext, key)

  return jsonify({"plaintext": plaintext})