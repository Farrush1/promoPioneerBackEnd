const prisma = require('../../libs/prisma')
const seedCategories = require('./category/seedCategory')
const seedCity = require('./city/seedCity')
const seedPromoType = require('./promoType/seedPromoType')

async function main () {
  await seedCategories()
  await seedPromoType()
  await seedCity()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
