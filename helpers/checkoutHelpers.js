const prisma = require('../libs/prisma')

function getUniqueCityIds (cartItems) {
  const uniqueCityIds = new Set()
  cartItems.forEach((item) => uniqueCityIds.add(item.product.warehouse.city_id))
  return [...uniqueCityIds]
}

async function createCheckoutCollection (userId) {
  return await prisma.checkoutCollection.create({
    data: { user_id: userId }
  })
}

async function createCheckouts (uniqueCityIds, cartItems, checkCollectionId) {
  for (const cityId of uniqueCityIds) {
    const checkout = await prisma.checkout.create({
      data: {
        checkout_collection_id: checkCollectionId,
        status: 'incomplete',
        city_id: cityId
      }
    })

    await createCheckoutItems(cartItems, checkout.id, cityId)
  }
}

async function createCheckoutItems (cartItems, checkoutId, cityId) {
  for (const item of cartItems) {
    if (item.product.warehouse.city_id === cityId) {
      const {
        product_id,
        quantity,
        product: { price, weight }
      } = item
      const totalSpecificPrice = price * quantity
      const checkoutItemWeight = weight * quantity

      await prisma.checkoutItem.create({
        data: {
          checkout_id: checkoutId,
          product_id,
          quantity,
          total_specific_price: totalSpecificPrice,
          weight: checkoutItemWeight
        }
      })
    }
  }
}

async function getCheckoutCollection (checkCollectionId) {
  return await prisma.checkoutCollection.findUnique({
    where: { id: checkCollectionId },
    include: {
      checkout: {
        include: {
          checkout_item: true
        }
      }
    }
  })
}

async function updateCheckouts (newCheckCollection) {
  for (const element of newCheckCollection.checkout) {
    let totalWeight = 0
    let subTotalPrice = 0

    element.checkout_item.forEach((item) => {
      totalWeight += item.weight
      subTotalPrice += item.total_specific_price
    })

    await prisma.checkout.update({
      where: { id: element.id },
      data: { subtotal_price: subTotalPrice, total_weight: totalWeight }
    })
  }
}

module.exports = {
  getUniqueCityIds,
  createCheckoutCollection,
  createCheckouts,
  getCheckoutCollection,
  updateCheckouts
}
