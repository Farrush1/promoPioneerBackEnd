function generateAffiliateCode () {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const codeLength = 6

  let code = ''
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters.charAt(randomIndex)
  }

  return code
}

module.exports = generateAffiliateCode
