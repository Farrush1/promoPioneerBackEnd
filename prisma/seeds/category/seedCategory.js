const prisma = require('../../../libs/prisma')

const CATEGORIES = [
  {
    id: 1,
    name: 'Baby Milk'
  },
  {
    id: 2,
    name: 'Baby Cart'
  }
]

const seedCategories = async () => {
  await Promise.all(
    CATEGORIES.map(async (category) => {
      await prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: category
      })
    })
  )
}

module.exports = seedCategories
