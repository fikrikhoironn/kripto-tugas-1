# create vigenere cipher function
def vigenereCipherEncrypt(plaintext, key):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    plaintext = plaintext.upper()
    key = key.upper()

    # create matrix
    matrix = []
    for i in range(26):
        matrix.append([])
        for j in range(26):
            matrix[i].append(alphabet[(i+j)%26])

    # encrypt
    ciphertext = ""
    for i in range(len(plaintext)):
        ciphertext += matrix[alphabet.index(key[i%len(key)])][alphabet.index(plaintext[i])]

    return ciphertext

def vigenereCipherDecrypt(ciphertext, key):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    ciphertext = ciphertext.upper()
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
    key = "sonysonysonys"
    ciphertext = vigenereCipherEncrypt(plaintext, key)
    print("ciphertext", ciphertext)
    plaintext = vigenereCipherDecrypt(ciphertext, key)
    print("plaintext", plaintext)



