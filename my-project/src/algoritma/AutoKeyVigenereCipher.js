function VigenereCipherEncrypt (plaintext, key){
    // sanitize plaintext delete spaces
    plaintext = plaintext.replace(/\s/g, "");
    // uppercase plaintext and key
    plaintext = plaintext.toUpperCase();
    key = key.toUpperCase();
    let ciphertext = "";
    let keyIndex = 0;
    for (var i = 0; i < plaintext.length; i++){
        var charCode = plaintext.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90){
            ciphertext += String.fromCharCode((charCode - 65 + key.charCodeAt(keyIndex) - 65) % 26 + 65);
            keyIndex = (keyIndex + 1) % key.length;
        }
        else if (charCode >= 97 && charCode <= 122){
            ciphertext += String.fromCharCode((charCode - 97 + key.charCodeAt(keyIndex) - 97) % 26 + 97);
            keyIndex = (keyIndex + 1) % key.length;
        }
        else {
            ciphertext += plaintext[i];
        }
    }
    // divide ciphertext into 5 characters
    ciphertext = ciphertext.match(/.{1,5}/g).join(" ");

    return ciphertext;
}
function autoKeyVigenereCipherEncrypt (plaintext, key) {
    // sanitize plaintext delete spaces
    plaintext = plaintext.replace(/\s/g, "");
    // santize key delete spaces
    key = key.replace(/\s/g, "");
    let ciphertext = "";
    if (plaintext.length > key.length) {
        key = key + plaintext.substring(0, plaintext.length - key.length);
    }
    ciphertext = VigenereCipherEncrypt(plaintext, key);
    return ciphertext;
}

function VigenereCipherDecrypt (ciphertext, key){
    // sanitize ciphertext delete spaces
    ciphertext = ciphertext.replace(/\s/g, "");
    // uppercase ciphertext and key
    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase();
    let plaintext = "";
    let keyIndex = 0;
    for (var i = 0; i < ciphertext.length; i++){
        var charCode = ciphertext.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90){
            plaintext += String.fromCharCode((charCode - 65 - key.charCodeAt(keyIndex) + 65 + 26) % 26 + 65);
            console.log("plaintext: " + plaintext);
            keyIndex = (keyIndex + 1) % key.length;
        }
        else {
            plaintext += ciphertext[i];
        }
        if (key.length < ciphertext.length){
            key += plaintext[i];
        }
    }
    // divide plaintext into 5 characters
    plaintext = plaintext.match(/.{1,5}/g).join(" ");

    return plaintext;
}
function autoKeyVigenereCipherDecrypt (ciphertext, key) {
    // sanitize ciphertext delete spaces
    ciphertext = ciphertext.replace(/\s/g, "");
    // santize key delete spaces
    let plaintext = "";
    console.log ("key: " + key);
    plaintext = VigenereCipherDecrypt(ciphertext, key);
    return plaintext;
}

function main(){
    let plaintext;
    plaintext = "negara penghasil minyak";
    let key;
    key = "INDO";

    let ciphertext;
    ciphertext = autoKeyVigenereCipherEncrypt(plaintext, key);
    console.log("ciphertext: " + ciphertext);

    let plaintextBaru = autoKeyVigenereCipherDecrypt(ciphertext, key);
    console.log("plaintext: "+ plaintextBaru);
}

main();