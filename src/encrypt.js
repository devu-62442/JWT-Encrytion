var jwt = require('jsonwebtoken')
var crypt = require('./logic')


const generateJWTToken =  (jwtDetails, pubData = {}, encSettings = {}, encData = {}, encDataKey = 'encData') => {
  const jwtPayload = {
    public: pubData,
  }

  jwtPayload[encDataKey] =  crypt.encryptionCall(encSettings, encData)

  const jwtDefaults = {
    algorithm: 'HS256',
    expiresIn: '12h',
  }

  const jwtParams = { ...jwtDetails }

  const iss = jwtParams.key
  delete (jwtParams.key)
  const { secret } = jwtParams
  delete (jwtParams.secret)

  
  return jwt.sign(
    {
      iss,
      data: jwtPayload,
    },
    secret,
    {
      ...jwtDefaults,
      ...jwtParams,
    },
  )
}

module.exports = generateJWTToken

