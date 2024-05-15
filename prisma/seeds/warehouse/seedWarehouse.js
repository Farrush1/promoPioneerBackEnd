const prisma = require('../../../libs/prisma')

const WAREHOUSE = [
  { id: 1, name: 'Gudang Utara', location: 'Jl. Gatot Subroto No. 123', city_id: 1 },
  { id: 2, name: 'Gudang Selatan', location: 'Jl. Sudirman No. 456', city_id: 2 },
  { id: 3, name: 'Gudang Barat', location: 'Jl. Merdeka No. 789', city_id: 3 },
  { id: 4, name: 'Gudang Timur', location: 'Jl. Pahlawan No. 1011', city_id: 4 },
  { id: 5, name: 'Gudang Sentral', location: 'Jl. Ahmad Yani No. 1213', city_id: 5 },
  { id: 6, name: 'Gudang Pusat', location: 'Jl. Diponegoro No. 1415', city_id: 6 },
  { id: 7, name: 'Gudang Terusan', location: 'Jl. Gajah Mada No. 1617', city_id: 7 },
  { id: 8, name: 'Gudang Depan', location: 'Jl. Imam Bonjol No. 1819', city_id: 8 },
  { id: 9, name: 'Gudang Belakang', location: 'Jl. Jenderal Sudirman No. 2021', city_id: 9 },
  { id: 10, name: 'Gudang Samping', location: 'Jl. A. Yani No. 2223', city_id: 10 },
  { id: 11, name: 'Gudang Tengah', location: 'Jl. Asia Afrika No. 2425', city_id: 11 },
  { id: 12, name: 'Gudang Pinggir', location: 'Jl. Perintis Kemerdekaan No. 2627', city_id: 12 },
  { id: 13, name: 'Gudang Pelabuhan', location: 'Jl. Pelabuhan No. 2829', city_id: 13 },
  { id: 14, name: 'Gudang Perkotaan', location: 'Jl. Perkotaan No. 3031', city_id: 14 },
  { id: 15, name: 'Gudang Perdesaan', location: 'Jl. Perdesaan No. 3233', city_id: 15 },
  { id: 16, name: 'Gudang Perbatasan', location: 'Jl. Perbatasan No. 3435', city_id: 16 },
  { id: 17, name: 'Gudang Pergunungan', location: 'Jl. Pergunungan No. 3637', city_id: 17 },
  { id: 18, name: 'Gudang Persawahan', location: 'Jl. Persawahan No. 3839', city_id: 18 },
  { id: 19, name: 'Gudang Pesisir', location: 'Jl. Pesisir No. 4041', city_id: 19 },
  { id: 20, name: 'Gudang Pegunungan', location: 'Jl. Pegunungan No. 4243', city_id: 20 }
]

const seedWarehouse = async () => {
  await Promise.all(
    WAREHOUSE.map(async (warehouse) => {
      await prisma.wareHouse.upsert({
        where: { id: warehouse.id },
        update: {},
        create: warehouse
      })
    })
  )
}

module.exports = seedWarehouse
