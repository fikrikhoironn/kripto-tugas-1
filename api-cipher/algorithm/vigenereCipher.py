# create vigenere cipher function
def vigenereCipherEncrypt(plaintext, key, group):
    plaintext = plaintext.replace(" ", "")
    key = key.replace(" ", "")
    plaintext = plaintext.upper()
    key = key.upper()
    ciphertext = ""
    keyIndex = 0
    for c in plaintext:
        charCode = ord(c)
        keyCode = ord(key[keyIndex])
        ciphertext += chr((charCode + keyCode) % 26 + 65)
        keyIndex = (keyIndex + 1) % len(key)

    # return ciphertext group 5 character
    if group == True:
        ciphertextGroup = ""
        for i in range(len(ciphertext)):
            ciphertextGroup += ciphertext[i]
            if (i+1) % 5 == 0:
                ciphertextGroup += " "
        return ciphertextGroup
    return ciphertext

def vigenereCipherDecrypt(ciphertext, key):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    ciphertext = ciphertext.replace(" ", "")
    ciphertext = ciphertext.upper()
    key = key.replace(" ", "")
    key = key.upper()

    # create matrix
    matrix = []
    for i in range(26):
        matrix.append([])
        for j in range(26):
            matrix[i].append(alphabet[(i+j)%26])

    # decrypt
    plaintext = ""
    for i in range(len(ciphertext)):
        plaintext += alphabet[matrix[alphabet.index(key[i%len(key)])].index(ciphertext[i])]
    return plaintext

if __name__ == "__main__":
    plaintext = "thisplaintext"
    key = "sony"
    ciphertext = vigenereCipherEncrypt(plaintext, key, True)
    print("ciphertext", ciphertext)
    plaintext = vigenereCipherDecrypt(ciphertext, key)
    print("plaintext", plaintext)



