var crypto = require('crypto')

module.exports = {
  encrypt(encryptionConfig, text) {
    const { algorithm, iv } = encryptionConfig;
    const key = crypto.createHash('sha256').update(String('data')).digest('base64').substr(0, 32)    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  encryptionCall(encryptionConfig, object) {
    return this.encrypt(encryptionConfig, JSON.stringify(object));
  },
  decrypt(encryptionConfig, text) {
    const { algorithm, iv } = encryptionConfig;
    const key = crypto.createHash('sha256').update(String('data')).digest('base64').substr(0, 32)
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  },
  decryptionCall(encryptionConfig, text) {
    return JSON.parse(this.decrypt(encryptionConfig, text));
  },
};
