const prisma = require('../../libs/prisma')
const seedCategories = require('./category/seedCategory')
const seedProvince = require('./province/seedProvince')
const seedCity = require('./city/seedCity')
const seedPromoType = require('./promoType/seedPromoType')
const seedWarehouse = require('./warehouse/seedWarehouse')
const seedProduct = require('./product/seedProduct')
const seedUser = require('./user/seedUser')
const seedCart = require('./cart/seedCart')
const seedAffiliateCode = require('./affiliateCode/seedAffiliateCode')
const seedPromo = require('./promo/seedPromo')

async function main () {
  await seedCategories()
  await seedPromoType()
  await seedPromo()
  await seedProvince()
  await seedCity()
  await seedWarehouse()
  await seedProduct()
  await seedUser()
  await seedCart()
  await seedAffiliateCode()
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
