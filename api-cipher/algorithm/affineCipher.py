inverse = {
  1: 1,
  3: 9,
  5: 21,
  7: 15,
  9: 3,
  11: 19,
  15: 7,
  17: 23,
  19: 11,
  21: 5,
  23: 17,
  25: 25
}

def affineEncrypt(plaintext, m, b, group):
  ciphertext = ""
  plaintext = plaintext.replace(" ", "")
  plaintext = plaintext.upper()
  print("m: ", m)
  print("b: ", b)
  for c in plaintext:
    ciphertext += chr(((ord(c)-65)*m+b)%26 + 65)

  if group:
    ciphertextGroup = ""
    for i in range(len(ciphertext)):
      ciphertextGroup += ciphertext[i]
      if (i+1) % 5 == 0:
        ciphertextGroup += " "
    return ciphertextGroup
  return ciphertext

def affineDecrypt(ciphertext, m, b):
  plaintext = ""
  ciphertext = ciphertext.replace(" ", "")
  ciphertext = ciphertext.upper()

  # check if m has inverse
  if m not in inverse:
    return "m has no inverse"
  else:
    i = inverse[m]
  
  for c in ciphertext:
    plaintext += chr(((ord(c)-65)-b)*i%26 + 65)
  return plaintext


# def main():
#   plaintext = input("Enter plaintext: ")
#   m = int(input("Enter m: "))
#   b = int(input("Enter b: "))
#   print("Ciphertext: ", affineEncrypt(plaintext, m, b))
#   ciphertext = input("Enter ciphertext: ")
#   print("Plaintext: ", affineDecrypt(ciphertext, m, b))

# if __name__ == "__main__":
#   main()