alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def playfairEncrypt(plaintext, key):
  plaintext = plaintext.replace(" ", "")
  plaintext = plaintext.upper()

  # remove duplicate letters
  key = "".join(dict.fromkeys(key))
  key = key.upper()

  # debugging
  print("plaintext", plaintext)
  print("key", key)

  # create 5x5 matrix
  cnt = 0
  idx = 0
  matrix = []
  for i in range(5):
    matrix.append([])
    for j in range(5):
      if cnt < len(key):
        matrix[i].append(key[cnt])
        cnt += 1
      else:
        while alphabet[idx] in key:
          idx += 1
        matrix[i].append(alphabet[idx])
        idx += 1
  
  
  print(matrix)
  
  # encrypt
  ciphertext = ""
  sisa = ""
  if len(plaintext) % 2 == 1:
    sisa = plaintext[-1]
    plaintext = plaintext[:-1]

  for i in range(0, len(plaintext), 2):
    # get the position of the letter
    for row in range(5):
      for col in range(5):
        if matrix[row][col] == plaintext[i]:
          pos1 = (row, col)
        if matrix[row][col] == plaintext[i+1]:
          pos2 = (row, col)
    
    # same row
    if pos1[0] == pos2[0]:
      ciphertext += matrix[pos1[0]][(pos1[1]+1)%5]
      ciphertext += matrix[pos2[0]][(pos2[1]+1)%5]
    # same column
    elif pos1[1] == pos2[1]:
      ciphertext += matrix[(pos1[0]+1)%5][pos1[1]]
      ciphertext += matrix[(pos2[0]+1)%5][pos2[1]]
    # different row and column
    else:
      ciphertext += matrix[pos1[0]][pos2[1]]
      ciphertext += matrix[pos2[0]][pos1[1]]
  
  if sisa != "":
    ciphertext += sisa
  
  print("ciphertext", ciphertext)
  return ciphertext

def playfairDecrypt(ciphertext, key):
  ciphertext = ciphertext.replace(" ", "").upper()
  key = "".join(dict.fromkeys(key)).upper()

  # create 5x5 matrix
  cnt = 0
  idx = 0
  matrix = []
  for i in range(5):
    matrix.append([])
    for j in range(5):
      if cnt < len(key):
        matrix[i].append(key[cnt])
        cnt += 1
      else:
        while alphabet[idx] in key:
          idx += 1
        matrix[i].append(alphabet[idx])
        idx += 1
  
  # decrypt
  plaintext = ""
  sisa = ""
  if len(ciphertext) % 2 == 1:
    sisa = ciphertext[-1]
    ciphertext = ciphertext[:-1]
  
  for i in range(0, len(ciphertext), 2):
    # get the position of the letter
    for row in range(5):
      for col in range(5):
        if matrix[row][col] == ciphertext[i]:
          pos1 = (row, col)
        if matrix[row][col] == ciphertext[i+1]:
          pos2 = (row, col)
    
    # same row
    if pos1[0] == pos2[0]:
      plaintext += matrix[pos1[0]][(pos1[1]-1)%5]
      plaintext += matrix[pos2[0]][(pos2[1]-1)%5]
    # same column
    elif pos1[1] == pos2[1]:
      plaintext += matrix[(pos1[0]-1)%5][pos1[1]]
      plaintext += matrix[(pos2[0]-1)%5][pos2[1]]
    # different row and column
    else:
      plaintext += matrix[pos1[0]][pos2[1]]
      plaintext += matrix[pos2[0]][pos1[1]]
  
  if sisa != "":
    plaintext += sisa
  
  print("plaintext", plaintext)
  return plaintext

def main():
  plaintext = input("Masukkan plainteks: ")
  key = input("Masukkan kunci: ")
  ciphertext = playfairEncrypt(plaintext, key)
  playfairDecrypt(ciphertext, key)

if __name__ == "__main__":
  main()