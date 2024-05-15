const prisma = require('../../../libs/prisma')

const PROMO_TYPE = [
  {
    id: 1,
    name: 'ALL_PRODUCT'
  },
  {
    id: 2,
    name: 'SPECIFIC_PRODUCT'
  }
]

const seedPromoType = async () => {
  await Promise.all(
    PROMO_TYPE.map(async (promoType) => {
      await prisma.promoType.upsert({
        where: { id: promoType.id },
        update: {},
        create: promoType
      })
    })
  )
}

module.exports = seedPromoType
