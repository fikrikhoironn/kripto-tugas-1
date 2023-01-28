function AffineCipherEncrypt(plaintext: string, key: number, shift: number) {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ciphertext = '';
  plaintext = plaintext.toUpperCase();
  for (var i = 0; i < plaintext.length; i++) {
    var c = plaintext[i];
    if (c.match(/[A-Z]/i)) {
      var code = alphabet.indexOf(c);
      var x = (key * code + shift) % 26;
      ciphertext += alphabet[x];
    } else {
      ciphertext += c;
    }
  }
  return ciphertext;
}

function AffineCipherDecrypt(ciphertext: string, key: number, shift: number) {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var plaintext = '';
  ciphertext = ciphertext.toUpperCase();
  for (var i = 0; i < ciphertext.length; i++) {
    var c = ciphertext[i];
    if (c.match(/[A-Z]/i)) {
      var code = alphabet.indexOf(c);
      var x = (code - shift) * key % 26;
      plaintext += alphabet[x];
    } else {
      plaintext += c;
    }
  }
  return plaintext;
}

export { AffineCipherEncrypt, AffineCipherDecrypt };
