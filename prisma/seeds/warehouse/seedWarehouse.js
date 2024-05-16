const prisma = require('../../../libs/prisma')

const WAREHOUSES = [
  {
    // id: 1,
    name: "Mrs. Siti's Warehouse",
    location: '123 Gatot Subroto Street',
    city_id: 1
  },
  {
    // id: 2,
    name: "Mr. Budi's Warehouse",
    location: '456 Sudirman Street',
    city_id: 2
  },
  {
    // id: 3,
    name: "Mrs. Rini's Warehouse",
    location: '789 Merdeka Street',
    city_id: 3
  },
  {
    // id: 4,
    name: "Mr. Dharma's Warehouse",
    location: '1011 Pahlawan Street',
    city_id: 4
  },
  {
    // id: 5,
    name: "Mrs. Lina's Warehouse",
    location: '1213 Ahmad Yani Street',
    city_id: 5
  },
  {
    // id: 6,
    name: "Mr. Joko's Warehouse",
    location: '1415 Diponegoro Street',
    city_id: 6
  },
  {
    // id: 7,
    name: "Mrs. Maya's Warehouse",
    location: '1617 Gajah Mada Street',
    city_id: 7
  },
  {
    // id: 8,
    name: "Mr. Ahmad's Warehouse",
    location: '1819 Imam Bonjol Street',
    city_id: 8
  },
  {
    // id: 9,
    name: "Mrs. Susi's Warehouse",
    location: '2021 Jenderal Sudirman Street',
    city_id: 9
  },
  {
    // id: 10,
    name: "Mr. Adi's Warehouse",
    location: '2223 A. Yani Street',
    city_id: 10
  },
  {
    // id: 11,
    name: "Mrs. Yuli's Warehouse",
    location: '2425 Asia Afrika Street',
    city_id: 11
  },
  {
    // id: 12,
    name: "Mr. Eko's Warehouse",
    location: '2627 Independence Pioneer Street',
    city_id: 12
  },
  {
    // id: 13,
    name: "Mrs. Rina's Warehouse",
    location: '2829 Harbor Street',
    city_id: 13
  },
  {
    // id: 14,
    name: "Mr. Dedi's Warehouse",
    location: '3031 Urban Street',
    city_id: 14
  },
  {
    // id: 15,
    name: "Mrs. Dewi's Warehouse",
    location: '3233 Rural Street',
    city_id: 15
  },
  {
    // id: 16,
    name: "Mr. Amin's Warehouse",
    location: '3435 Border Street',
    city_id: 16
  },
  {
    // id: 17,
    name: "Mrs. Nina's Warehouse",
    location: '3637 Mountain Street',
    city_id: 17
  },
  {
    // id: 18,
    name: "Mr. Heri's Warehouse",
    location: '3839 Rice Field Street',
    city_id: 18
  },
  {
    // id: 19,
    name: "Mrs. Tina's Warehouse",
    location: '4041 Coastal Street',
    city_id: 19
  },
  {
    // id: 20,
    name: "Mr. Bambang's Warehouse",
    location: '4243 Mountain Range Street',
    city_id: 20
  }
]

const seedWarehouse = async () => {
  await Promise.all(
    WAREHOUSES.map(async (warehouse) => {
      await prisma.wareHouse.create({
        data: warehouse
      })
    })
  )
}
// const seedWarehouse = async () => {
//   await Promise.all(
//     WAREHOUSES.map(async (warehouse) => {
//       await prisma.wareHouse.upsert({
//         where: { id: warehouse.id },
//         update: {},
//         create: warehouse,
//       })
//     }),
//   )
// }

module.exports = seedWarehouse
