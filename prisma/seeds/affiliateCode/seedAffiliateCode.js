const prisma = require('../../../libs/prisma')

const AFFILIATECODE = [
  { id: 1, user_id: 1, affiliate_code: '638WH7' },
  { id: 2, user_id: 2, affiliate_code: 'VX6TKX' },
]

const seedAffiliateCode = async () => {
  await Promise.all(
    AFFILIATECODE.map(async (affiliateCode) => {
      await prisma.affiliateCode.upsert({
        where: { id: affiliateCode.id },
        update: {},
        create: affiliateCode,
      })
    }),
  )
}

module.exports = seedAffiliateCode
