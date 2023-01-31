import sympy as sym


def hillEncrypt(plaintext, m, matrix):
  plaintext = plaintext.replace(" ", "").upper()
  ciphertext = ""

  if (m < 2):
    return "m must be greater than 1"

  # check if m is valid
  if (len(plaintext) % m != 0):
    return "m is not valid"

  # check if matrix is valid
  if (len(matrix) != m):
    return "matrix is not valid"
  
  for i in range(m):
    if (len(matrix[i]) != m):
      return "matrix is not valid"
  
  for i in range(0, len(plaintext), m):
    for j in range(m):
      num = 0
      for k in range(m):
        num += (ord(plaintext[i+k])-65) * matrix[j][k]
      ciphertext += chr(num%26 + 65)
  
  return ciphertext

def hillDecrypt(ciphertext, m, matrix):
  ciphertext = ciphertext.replace(" ", "").upper()

  if (m < 2):
    return "m must be greater than 1"

  # check if m is valid
  if (len(ciphertext) % m != 0):
    return "m is not valid"
  
  # check if matrix is valid
  if (len(matrix) != m):
    return "matrix is not valid"
  
  for i in range(m):
    if (len(matrix[i]) != m):
      return "matrix is not valid"
  
  # find inverse matrix
  matrix = sym.Matrix(matrix)
  print("matrix")
  print(matrix)
  inverseMatrix = matrix.inv_mod(26)

  print("\ninverse matrix")
  print(inverseMatrix)

  plaintext = ""
  for i in range(0, len(ciphertext), m):
    for j in range(m):
      num = 0
      for k in range(m):
        num += (ord(ciphertext[i+k])-65) * inverseMatrix[j, k]
      plaintext += chr(num%26 + 65)
  
  return plaintext

if __name__ == "__main__":
  plaintext = input("Enter plaintext: ")
  m = int(input("Enter m: "))
  matrix = []
  for i in range(m):
    matrix.append([])
    for j in range(m):
      matrix[i].append(int(input("Enter matrix[{}][{}]: ".format(i, j))))
  print("Ciphertext: ", hillEncrypt(plaintext, m, matrix))
  ciphertext = input("Enter ciphertext: ")
  # hillDecrypt(ciphertext, m, matrix)
  # hillDecrypt("LNSHDLEWMTRW", m, matrix)
  print("Plaintext: ", hillDecrypt(ciphertext, m, matrix))