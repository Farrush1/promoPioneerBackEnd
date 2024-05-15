const prisma = require('../../../libs/prisma')

const CATEGORIES = [
  { id: 1, name: 'Pakaian Bayi' },
  { id: 2, name: 'Peralatan Makan Bayi' },
  { id: 3, name: 'Popok dan Pembalut Bayi' },
  { id: 4, name: 'Botol Susu dan Aksesoris' },
  { id: 5, name: 'Stroller dan Kereta Dorong' },
  { id: 6, name: 'Kamar Bayi' },
  { id: 7, name: 'Mainan Bayi' },
  { id: 8, name: 'Perlengkapan Mandi Bayi' },
  { id: 9, name: 'Peralatan Penyusuan Bayi' },
  { id: 10, name: 'Kesehatan dan Keamanan Bayi' }
]

const seedCategories = async () => {
  await Promise.all(
    CATEGORIES.map(async (category) => {
      await prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: category
      })
    })
  )
}

module.exports = seedCategories
