const prisma = require('../libs/prisma')
const shippingCost = require('../utils/shippingCost')

function getUniqueCityIds(cartItems) {
  const uniqueCityIds = new Set()
  cartItems.forEach((item) => uniqueCityIds.add(item.product.warehouse.city_id))
  return [...uniqueCityIds]
}

async function createCheckoutCollection(userId) {
  return await prisma.checkoutCollection.create({
    data: { user_id: userId },
  })
}

async function createCheckouts(uniqueCityIds, cartItems, checkCollectionId) {
  for (const cityId of uniqueCityIds) {
    const checkout = await prisma.checkout.create({
      data: {
        checkout_collection_id: checkCollectionId,
        status: 'incomplete',
        city_id: cityId,
      },
    })

    await createCheckoutItems(cartItems, checkout.id, cityId)
  }
}

async function createCheckoutItems(cartItems, checkoutId, cityId) {
  for (const item of cartItems) {
    if (item.product.warehouse.city_id === cityId) {
      const {
        product_id,
        quantity,
        product: { price, weight },
      } = item
      const totalSpecificPrice = price * quantity
      const checkoutItemWeight = weight * quantity

      await prisma.checkoutItem.create({
        data: {
          checkout_id: checkoutId,
          product_id,
          quantity,
          total_specific_price: totalSpecificPrice,
          weight: checkoutItemWeight,
        },
      })
    }
  }
}

async function getCheckoutCollection(checkCollectionId) {
  return await prisma.checkoutCollection.findUnique({
    where: { id: checkCollectionId },
    include: {
      CheckoutDiscount: true,
      checkout: {
        include: {
          checkout_item: {
            include: {
              product: true,
            },
          },
          shippingCheckout: true,
        },
      },
    },
  })
}

async function updateCheckouts(newCheckCollection, userCityId) {
  for (const element of newCheckCollection.checkout) {
    let totalWeight = 0
    let subTotalPrice = 0

    element.checkout_item.forEach((item) => {
      totalWeight += item.weight
      subTotalPrice += item.total_specific_price
    })

    const ship = await firstShip(element.city_id, userCityId, totalWeight)

    const { code, service, cost } = ship.firstShiping
    const shipping = await prisma.shippingCheckout.upsert({
      where: { checkout_id: element.id },
      update: { name: code, service, price: cost },
      create: { name: code, service, price: cost, checkout_id: element.id },
    })

    const totalCheckPrice = subTotalPrice + shipping.price
    await prisma.checkout.update({
      where: { id: element.id },
      data: {
        total_checkout_price: totalCheckPrice,
        subtotal_price: subTotalPrice,
        total_weight: totalWeight,
      },
    })
  }
}

async function shippingOption(origin, destination, weight) {
  try {
    const services = ['jne', 'tiki', 'pos']
    const shippingPromises = services.map((service) =>
      shippingCost(origin, destination, weight, service),
    )

    const shippingResults = await Promise.all(shippingPromises)

    const shippOption = {}

    services.forEach((service, index) => {
      const result = shippingResults[index]
      shippOption[service] = result
    })

    return {
      shippOption,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function firstShip(origin, destination, weight) {
  try {
    const services = ['jne', 'tiki', 'pos']
    let firstShiping = null

    for (const service of services) {
      const shipping = await shippingCost(origin, destination, weight, service)

      if (shipping && shipping[0] && shipping[0].costs && shipping[0].costs.length > 0) {
        const cost = shipping[0].costs[0]
        firstShiping = {
          code: service,
          service: cost.service,
          cost: cost.cost,
        }
        break
      }
    }

    return {
      firstShiping,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
module.exports = {
  getUniqueCityIds,
  createCheckoutCollection,
  createCheckouts,
  getCheckoutCollection,
  updateCheckouts,
  shippingOption,
  firstShip,
}
