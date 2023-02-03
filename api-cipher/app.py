from algorithm.affineCipher import affineDecrypt, affineEncrypt
from algorithm.autoKeyVigenereCipher import (autoKeyVigenereCipherDecrypt,
                                             autoKeyVigenereCipherEncrypt)
from algorithm.extendedVigenereCipher import (extendedVigenereCipherDecrypt,
                                              extendedVigenereCipherEncrypt)
from algorithm.hillCipher import hillDecrypt, hillEncrypt
from algorithm.playfairCipher import playfairDecrypt, playfairEncrypt
from algorithm.vigenereCipher import (vigenereCipherDecrypt,
                                      vigenereCipherEncrypt)
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__)


@app.route('/')
@cross_origin()
def hello_world():
    return 'This is my first API call!'


@app.route('/get', methods=["GET"])
@cross_origin()
def get():
    return jsonify({"message": "Hello World"})


@app.route('/encrypt/vigenere-simple', methods=["POST"])
@cross_origin()
def encrypt_vigenere_simple():
    input_json = request.get_json(force=True)
    plaintext = input_json['plaintext']
    key = input_json['key']
    group = input_json['group']
    if group == "true":
        group = True
    else:
        group = False
    ciphertext = vigenereCipherEncrypt(plaintext, key, group)
    return jsonify({"ciphertext": ciphertext})


@app.route('/decrypt/vigenere-simple', methods=["POST"])
@cross_origin()
def decrypt_vigenere_simple():
    input_json = request.get_json(force=True)
    ciphertext = input_json['ciphertext']
    key = input_json['key']


    plaintext = vigenereCipherDecrypt(ciphertext, key)

    return jsonify({"plaintext": plaintext})


@app.route('/encrypt/vigenere-autokey', methods=["POST"])
@cross_origin()
def encrypt_vigenere_autokey():
    input_json = request.get_json(force=True)
    plaintext = input_json['plaintext']
    key = input_json['key']
    group = input_json['group']
    if group == "true":
        group = True
    else:
        group = False

    ciphertext = autoKeyVigenereCipherEncrypt(plaintext, key, group)

    return jsonify({"ciphertext": ciphertext})


@app.route('/decrypt/vigenere-autokey', methods=["POST"])
@cross_origin()
def decrypt_vigenere_autokey():
    input_json = request.get_json(force=True)
    ciphertext = input_json['ciphertext']
    key = input_json['key']

    plaintext = autoKeyVigenereCipherDecrypt(ciphertext, key)

    return jsonify({"plaintext": plaintext})


@app.route('/encrypt/vigenere-extended', methods=["POST"])
@cross_origin()
def encrypt_vigenere_extended():
    input_json = request.get_json(force=True)
    plaintext = input_json['plaintext']
    key = input_json['key']
    group = input_json['group']
    if group == "true":
        group = True
    else:
        group = False

    ciphertext = extendedVigenereCipherEncrypt(plaintext, key, group)

    return jsonify({"ciphertext": ciphertext})


@app.route('/decrypt/vigenere-extended', methods=["POST"])
@cross_origin()
def decrypt_vigenere_extended():
    input_json = request.get_json(force=True)
    ciphertext = input_json['ciphertext']
    key = input_json['key']

    plaintext = extendedVigenereCipherDecrypt(ciphertext, key)

    return jsonify({"plaintext": plaintext})


@app.route('/encrypt/affine', methods=["POST"])
@cross_origin()
def encrypt_affine():
    input_json = request.get_json(force=True)
    plaintext = input_json['plaintext']
    m = input_json['m']
    b = input_json['b']

    m = int(m)
    b = int(b)
    group = input_json['group']
    if group == "true":
        group = True
    else:
        group = False

    ciphertext = affineEncrypt(plaintext, m, b, group)

    return jsonify({"ciphertext": ciphertext})


@app.route('/decrypt/affine', methods=["POST"])
@cross_origin()
def decrypt_affine():
    input_json = request.get_json(force=True)
    ciphertext = input_json['ciphertext']
    m = input_json['m']
    b = input_json['b']

    plaintext = affineDecrypt(ciphertext, m, b)

    return jsonify({"plaintext": plaintext})


@app.route('/encrypt/playfair', methods=["POST"])
@cross_origin()
def encrypt_playfair():
    input_json = request.get_json(force=True)
    plaintext = input_json['plaintext']
    key = input_json['key']
    group = input_json['group']
    if group == "true":
        group = True
    else:
        group = False

    ciphertext = playfairEncrypt(plaintext, key, group)

    return jsonify({"ciphertext": ciphertext})


@app.route('/decrypt/playfair', methods=["POST"])
@cross_origin()
def decrypt_playfair():
    input_json = request.get_json(force=True)
    ciphertext = input_json['ciphertext']
    key = input_json['key']

    plaintext = playfairDecrypt(ciphertext, key)

    return jsonify({"plaintext": plaintext})


@app.route('/encrypt/hill', methods=["POST"])
@cross_origin()
def encrypt_hill():
    input_json = request.get_json(force=True)
    plaintext = input_json['plaintext']
    m = input_json['m']
    matrix = input_json['matrix']
    group = input_json['group']
    if group == "true":
        group = True
    else:
        group = False

    print(plaintext)
    print(m)
    print(matrix)
    ciphertext = hillEncrypt(plaintext, m, matrix, group)

    # return jsonify({"ciphertext": "ciphertext"})
    return jsonify({"ciphertext": ciphertext})


@app.route('/decrypt/hill', methods=["POST"])
@cross_origin()
def decrypt_hill():
    input_json = request.get_json(force=True)
    ciphertext = input_json['ciphertext']
    m = input_json['m']
    matrix = input_json['matrix']

    plaintext = hillDecrypt(ciphertext, m, matrix)

    return jsonify({"plaintext": plaintext})


if __name__ == '__main__':
    app.run(debug=True)
