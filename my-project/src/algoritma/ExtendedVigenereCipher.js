// vigenere cipher for 256 ascii characters
function extendedVigenereCipherEncrypt(plaintext, key){
    // sanitize plaintext delete spaces
    plaintext = plaintext.replace(/\s/g, "");
    // uppercase plaintext and key
    plaintext = plaintext.toUpperCase();
    key = key.toUpperCase();
    let ciphertext = "";
    let keyIndex = 0;

    for (var i = 0; i < plaintext.length; i++){
        var charCode = plaintext.charCodeAt(i);
        if (charCode >= 0 && charCode <= 255){
            ciphertext += String.fromCharCode((charCode + key.charCodeAt(keyIndex)) % 256);
            // console.log("cipher code:" + (charCode + key.charCodeAt(keyIndex)) % 256)
            // console.log("cipher char:" + String.fromCharCode((charCode + key.charCodeAt(keyIndex)) % 256))
            keyIndex = (keyIndex + 1) % key.length;
        }
        else {
            ciphertext += plaintext[i];
        }
    }
    // divide ciphertext into 5 characters
    console.log(ciphertext);
    ciphertext = ciphertext.match(/.{1,5}/g).join(" ");
    return ciphertext;
}

function extendedVigenereCipherDecrypt(ciphertext, key){
    // sanitize ciphertext delete spaces
    ciphertext = ciphertext.replace(/\s/g, "");
    // uppercase ciphertext and key
    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase();
    let plaintext = "";
    let keyIndex = 0;
    for (var i = 0; i < ciphertext.length; i++){
        var charCode = ciphertext.charCodeAt(i);
        if (charCode >= 0 && charCode <= 255){
            plaintext += String.fromCharCode((charCode - key.charCodeAt(keyIndex) + 256) % 256);
            keyIndex = (keyIndex + 1) % key.length;
        }
        else {
            plaintext += ciphertext[i];
        }
    }
    // divide plaintext into 5 characters
    plaintext = plaintext.match(/.{1,5}/g).join(" ");

    return plaintext;
}

function main(){
    let plaintext = "Dinas Pendidikan";
    let key = "selatsunda";

    let ciphertext = extendedVigenereCipherEncrypt(plaintext, key);
    console.log(ciphertext);

    let plaintextBaru = extendedVigenereCipherDecrypt(ciphertext, key);
    console.log(plaintextBaru);
}

main();