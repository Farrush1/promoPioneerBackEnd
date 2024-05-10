async function shippingCost (origin, destination, weight, courier) {
  try {
    const data = { origin, destination, weight, courier }
    const fetchCost = await fetch('https://api.rajaongkir.com/starter/cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: process.env.RAJAONGKIR_API_KEY
      },
      body: JSON.stringify(data)
    })
    const response = await fetchCost.json()
    const result = response.rajaongkir.results
    const newResult = result.map((item) => {
      return {
        code: item.code,
        name: item.name,
        costs: item.costs.map((cost) => {
          return {
            service: cost.service,
            description: cost.description,
            cost: cost.cost[0].value
          }
        })
      }
    })
    return newResult
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = shippingCost
