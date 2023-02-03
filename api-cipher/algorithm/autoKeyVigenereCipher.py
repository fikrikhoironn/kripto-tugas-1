def autoKeyVigenereCipherEncrypt(plaintext, key, group):
    plaintext = plaintext.replace(" ", "")
    key = key.replace(" ", "")
    plaintext = plaintext.upper()
    key = key.upper()
    ciphertext = ""
    if len(key) < len(plaintext):
        key += plaintext[:len(plaintext) - len(key)]
    for i in range(len(plaintext)):
        ciphertext += chr((ord(plaintext[i]) + ord(key[i])) % 26 + 65)
    if group == True:
        plaintextGroup = ""
        for i in range(len(plaintext)):
            plaintextGroup += plaintext[i]
            if (i+1) % 5 == 0:
                plaintextGroup += " "
        return plaintextGroup
    return ciphertext

def autoKeyVigenereCipherDecrypt(ciphertext, key):
    ciphertext = ciphertext.replace(" ", "")
    key = key.replace(" ", "")
    ciphertext = ciphertext.upper()
    key = key.upper()
    plaintext = ""
    keyIndex = 0
    for i in range(len(ciphertext)):
        plaintext += chr((ord(ciphertext[i]) - ord(key[i])) % 26 + 65)
        key += plaintext[i]

    return plaintext


if __name__ == "__main__":
    plaintext = "negarapenghasilminyak"
    key = "INDO"
    ciphertext = autoKeyVigenereCipherEncrypt(plaintext, key)
    plaintext = autoKeyVigenereCipherDecrypt(ciphertext, key)
    print("ciphertext", ciphertext)
    print("plaintext", plaintext)
