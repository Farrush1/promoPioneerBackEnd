const prisma = require('../../libs/prisma')
const seedCategories = require('./category/seedCategory')
const seedProvince = require('./province/seedProvince')
const seedCity = require('./city/seedCity')
const seedPromoType = require('./promoType/seedPromoType')
const seedWarehouse = require('./warehouse/seedWarehouse')

async function main () {
  await seedCategories()
  await seedPromoType()
  await seedProvince()
  await seedCity()
  await seedWarehouse()
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
