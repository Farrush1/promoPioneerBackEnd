const prisma = require('../../../libs/prisma')

const PROMO = [
  {
    id: 1,
    name: 'SPECIAL_USER',
    discount_percent: 50,
    quantity: 99,
    isLimitedQuantity: false,
    isLimitedTime: false,
    start_date: '2024-06-01T00:00:00.000Z',
    end_date: '2024-06-01T00:00:00.000Z',
    promo_type_id: 1
  },
  {
    id: 2,
    name: 'PROM1',
    discount_percent: 20,
    quantity: 100,
    isLimitedQuantity: true,
    isLimitedTime: false,
    start_date: '2024-06-01T00:00:00.000Z',
    end_date: '2024-06-01T00:00:00.000Z',
    promo_type_id: 1
  },
  {
    id: 3,
    name: 'PROM2',
    discount_percent: 35,
    quantity: 100,
    isLimitedQuantity: true,
    isLimitedTime: false,
    start_date: '2024-06-01T00:00:00.000Z',
    end_date: '2024-06-01T00:00:00.000Z',
    promo_type_id: 2
  }
]

const seedPromo = async () => {
  await Promise.all(
    PROMO.map(async (promo) => {
      await prisma.promo.create({
        data: promo
      })
    })
  )
}

module.exports = seedPromo
