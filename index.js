var jwtEncrypt = require("./src/encrypt")
var jwtDecrypt = require("./src/decrypt")
var readline = require('readline-sync');

var pub = readline.question("Enter your Public Data Here: ");

const publicData = {
    pub
}
var pri = readline.question("Enter the Private Data Here: ")
const privateData = {
    pri
}
var iv = readline.question("Enter the Random 10 characters: ") 
// Encryption settings
const encryption = {
    algorithm: 'aes-256-cbc',
    iv
  }
 
const jwtDetails = {
    secret: 'qwertyuiopasdfghjkl', // to sign the token
    // Default values that will be automatically applied unless specified.
    // algorithm: 'HS256',
    // expiresIn: '12h',
    // // notBefore: '0s',
    // Other optional values
    key: 'ThisIsMyAppISS'// is used as ISS but can be named iss too
}

token = jwtEncrypt(
      jwtDetails,
      publicData,
      encryption,
      privateData,
    )   

console.log("Encrypted Token -")
console.log(token)

decrypt_token = jwtDecrypt(token, encryption)
console.log("Decrypted Token -")
console.log(decrypt_token.data.pri)