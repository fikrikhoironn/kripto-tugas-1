# extended vigenere cipher function, vigenere cipher with 256 characters
def extendedVigenereCipherEncrypt(plaintext, key, group):
    plaintext = plaintext.replace(" ", "")
    key = key.replace(" ", "")
    plaintext = plaintext.upper()
    key = key.upper()

    ciphertext = ""
    keyIndex = 0

    for c in plaintext:
        charcode = ord(c)
        keycharcode = ord(key[keyIndex])
        ciphertext += chr((charcode + keycharcode) % 256)
        keyIndex = (keyIndex + 1) % len(key)

    if group:
        plaintextGroup = ""
        for i in range(len(plaintext)):
            plaintextGroup += plaintext[i]
            if (i+1) % 5 == 0:
                plaintextGroup += " "
        return plaintextGroup
    return ciphertext

def extendedVigenereCipherDecrypt(ciphertext, key):
    ciphertext = ciphertext.replace(" ", "")
    key = key.replace(" ", "")
    ciphertext = ciphertext.upper()
    key = key.upper()

    plaintext = ""
    keyIndex = 0

    for c in ciphertext:
        charcode = ord(c)
        keycharcode = ord(key[keyIndex])
        plaintext += chr((charcode - keycharcode) % 256)
        keyIndex = (keyIndex + 1) % len(key)

    return plaintext

if __name__ == "__main__":
    plaintext = "thisplaintext"
    key = "sonysonysonys"
    ciphertext = extendedVigenereCipherEncrypt(plaintext, key)
    print("ciphertext", ciphertext)
    plaintext = extendedVigenereCipherDecrypt(ciphertext, key)
    print("plaintext", plaintext)

