var jwt = require('jsonwebtoken')
var objectPath = require('object-path')
var crypt = require('./logic')

const readJWTToken = (tokenStr, encSettings, encDataKey = 'encData') => {
  const tokenData = jwt.decode(tokenStr)
  if (tokenData === null) throw new Error('Invalid JWT!')

  const publicData = objectPath.get(tokenData, 'data.public', {})
  const encryptedData = objectPath.get(tokenData, `data.${encDataKey}`, '')

  const newData = {
    ...publicData,
    ...crypt.decryptionCall(encSettings, encryptedData),
  }
  tokenData.data = newData
   
  return tokenData
}

module.exports = readJWTToken
