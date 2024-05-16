const prisma = require('../../../libs/prisma')

const CART = [
  {
    // id: 1,
    user_id: 1,
  },
  {
    // id: 2,
    user_id: 2,
  },
]

// const seedCart = async () => {
//   await Promise.all(
//     CART.map(async (cart) => {
//       await prisma.cart.upsert(
//         {
//           where: {
//             id: cart.id,
//           },
//           update: {},
//           create: cart,
//         },
//       )
//     }),
//   )
// }
const seedCart = async () => {
  await Promise.all(
    CART.map(async (cart) => {
      await prisma.cart.create(
        {
         data: cart
        },
      )
    }),
  )
}

module.exports = seedCart
