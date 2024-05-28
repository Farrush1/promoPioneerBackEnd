const prisma = require('../../../libs/prisma')

const PROMOPRODUCT = [
  {
    id: 1,
    promo_id: 3,
    product_id: 1
  },
  {
    id: 2,
    promo_id: 3,
    product_id: 2
  },
  {
    id: 3,
    promo_id: 3,
    product_id: 3
  },
  {
    id: 4,
    promo_id: 3,
    product_id: 4
  },
  {
    id: 5,
    promo_id: 3,
    product_id: 5
  },
  {
    id: 6,
    promo_id: 3,
    product_id: 6
  },
  {
    id: 7,
    promo_id: 3,
    product_id: 7
  },
  {
    id: 8,
    promo_id: 3,
    product_id: 8
  },
  {
    id: 9,
    promo_id: 3,
    product_id: 9
  },
  {
    id: 10,
    promo_id: 3,
    product_id: 10
  }
]

const seedPromoProduct = async () => {
  await Promise.all(
    PROMOPRODUCT.map(async (promProduct) => {
      await prisma.promoProduct.create({
        data: promProduct
      })
    })
  )
}

module.exports = seedPromoProduct
