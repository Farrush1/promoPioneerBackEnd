const prisma = require('../../../libs/prisma')

async function getCity () {
  try {
    const fetchCity = await fetch('https://api.rajaongkir.com/starter/city', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        key: process.env.RAJAONGKIR_API_KEY
      }
    })
    const data = await fetchCity.json()
    const dataRes = data.rajaongkir.results
    const manipulatedCities = dataRes.map((city) => {
      return {
        id: +city.city_id,
        rajaongkir_city_id: +city.city_id,
        rajaongkir_province_id: +city.province_id,
        province_name: city.province,
        type: city.type,
        name: city.city_name,
        postal_code: +city.postal_code
      }
    })
    return manipulatedCities
  } catch (error) {
    console.log(error)
  }
}

const seedCity = async () => {
  try {
    const cities = await getCity() // Wait for the city data
    await Promise.all(
      cities.map(async (city) => {
        await prisma.city.upsert({
          where: { id: city.id },
          update: {},
          create: city
        })
      })
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = seedCity
