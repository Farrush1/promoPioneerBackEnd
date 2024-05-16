const prisma = require('../../../libs/prisma')

const CATEGORIES = [
  {
    // id: 1,
    name: 'Baby Clothing'
  },
  {
    // id: 2,
    name: 'Baby Feeding Equipment'
  },
  {
    // id: 3,
    name: 'Diapers and Baby Wipes'
  },
  {
    // id: 4,
    name: 'Baby Bottles and Accessories'
  },
  {
    // id: 5,
    name: 'Strollers and Pushchairs'
  },
  {
    // id: 6,
    name: 'Baby Room'
  },
  {
    // id: 7,
    name: 'Baby Toys'
  },
  {
    // id: 8,
    name: 'Baby Bath Accessories'
  },
  {
    // id: 9,
    name: 'Baby Nursing Equipment'
  },
  {
    // id: 10,
    name: 'Baby Health and Safety'
  }

]

// const seedCategories = async () => {
//   await Promise.all(
//     CATEGORIES.map(async (category) => {
//       await prisma.category.upsert({
//         where: { id: category.id },
//         update: {},
//         create: category
//       })
//     })
//   )
// }
const seedCategories =
  async () => {
    await Promise.all(
      CATEGORIES.map(
        async (category) => {
          await prisma.category.create(
            {
              data: category
            }
          )
        }
      )
    )
  }

module.exports =
  seedCategories
