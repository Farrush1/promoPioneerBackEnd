const prisma = require('../../../libs/prisma')

async function getProvince() {
  try {
    const fetchProvince = await fetch('https://api.rajaongkir.com/starter/province', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        key: process.env.RAJAONGKIR_API_KEY,
      },
    })
    const data = await fetchProvince.json()
    const dataRes = data.rajaongkir.results
    const manipulatedProvince = dataRes.map((prov) => {
      return {
        id: +prov.province_id,
        name: prov.province
      }
    })
    return manipulatedProvince
  } catch (error) {
    console.log(error)
  }
}

const seedProvince = async () => {
  try {
    const province = await getProvince() // Wait for the city data
    await Promise.all(
      province.map(async (prov) => {
        await prisma.province.upsert({
          where: { id: prov.id },
          update: {},
          create: prov,
        })
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = seedProvince
