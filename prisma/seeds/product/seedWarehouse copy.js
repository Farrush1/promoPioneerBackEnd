const prisma = require('../../../libs/prisma')

const PRODUCT = [
  {
    id: 1,
    category_id: 1,
    warehouse_id: 101,
    name: 'Jumper Bayi Lucu',
    price: 150000,
    description: 'Jumper bayi berbahan lembut dan nyaman dengan desain lucu',
    product_image: 'jumper.jpg',
    stock: 50,
    weight: 150
  },
  {
    id: 2,
    category_id: 1,
    warehouse_id: 102,
    name: 'Setelan Bayi Polos',
    price: 120000,
    description: 'Setelan baju dan celana bayi dengan warna-warna polos yang cerah',
    product_image: 'setelan.jpg',
    stock: 70,
    weight: 120
  },

  // Produk untuk kategori "Peralatan Makan Bayi"
  {
    id: 3,
    category_id: 2,
    warehouse_id: 103,
    name: 'Sendok dan Garpu Bayi',
    price: 50000,
    description: 'Set sendok dan garpu bayi dengan desain ergonomis dan aman untuk bayi',
    product_image: 'sendok_garpu.jpg',
    stock: 100,
    weight: 50
  },
  {
    id: 4,
    category_id: 2,
    warehouse_id: 104,
    name: 'Piring Bayi Anti-Tumpah',
    price: 70000,
    description: 'Piring bayi dengan suction cup anti-tumpah dan mudah dibersihkan',
    product_image: 'piring.jpg',
    stock: 80,
    weight: 70
  },

  {
    id: 5,
    category_id: 3,
    warehouse_id: 105,
    name: 'Popok Sekali Pakai',
    price: 100000,
    description: 'Popok sekali pakai dengan daya serap tinggi dan lembut di kulit bayi',
    product_image: 'popok.jpg',
    stock: 120,
    weight: 100
  },
  {
    id: 6,
    category_id: 3,
    warehouse_id: 106,
    name: 'Pembalut Kain Bayi',
    price: 80000,
    description: 'Pembalut kain bayi yang ramah lingkungan dan cocok untuk kulit sensitif',
    product_image: 'pembalut.jpg',
    stock: 90,
    weight: 80
  },

  {
    id: 7,
    category_id: 4,
    warehouse_id: 107,
    name: 'Botol Susu Anti-Colic',
    price: 60000,
    description: 'Botol susu bayi dengan desain anti-colic untuk mengurangi masuk angin',
    product_image: 'botol_susu.jpg',
    stock: 60,
    weight: 70
  },
  {
    id: 8,
    category_id: 4,
    warehouse_id: 108,
    name: 'Sterilizer Botol Susu',
    price: 250000,
    description: 'Sterilizer botol susu yang praktis dan aman untuk digunakan',
    product_image: 'sterilizer.jpg',
    stock: 40,
    weight: 150
  },

  {
    id: 9,
    category_id: 5,
    warehouse_id: 109,
    name: 'Stroller Lipat Ringan',
    price: 800000,
    description: 'Stroller lipat yang ringan dan mudah dibawa bepergian',
    product_image: 'stroller.jpg',
    stock: 30,
    weight: 500
  },
  {
    id: 10,
    category_id: 5,
    warehouse_id: 110,
    name: 'Kereta Dorong Bayi 3 Roda',
    price: 1200000,
    description: 'Kereta dorong bayi dengan roda yang stabil dan dapat diputar 360 derajat',
    product_image: 'kereta_dorong.jpg',
    stock: 20,
    weight: 800
  },

  {
    id: 11,
    category_id: 6,
    warehouse_id: 111,
    name: 'Tempat Tidur Bayi Lipat',
    price: 500000,
    description: 'Tempat tidur bayi lipat dengan bingkai kokoh dan kasur yang nyaman',
    product_image: 'tempat_tidur.jpg',
    stock: 25,
    weight: 1000
  },
  {
    id: 12,
    category_id: 6,
    warehouse_id: 112,
    name: 'Lampu Tidur Bayi Lucu',
    price: 150000,
    description: 'Lampu tidur bayi dengan desain lucu dan cahaya yang lembut',
    product_image: 'lampu_tidur.jpg',
    stock: 35,
    weight: 300
  },

  {
    id: 13,
    category_id: 7,
    warehouse_id: 113,
    name: 'Guling Bayi Bermain',
    price: 90000,
    description: 'Guling bayi dengan desain warna-warni dan berbagai mainan gantung',
    product_image: 'guling.jpg',
    stock: 45,
    weight: 200
  },
  {
    id: 14,
    category_id: 7,
    warehouse_id: 114,
    name: 'Buku Bayi Interaktif',
    price: 75000,
    description: 'Buku bayi yang berisi gambar-gambar lucu dan suara-suara yang menghibur',
    product_image: 'buku_bayi.jpg',
    stock: 55,
    weight: 150
  },

  {
    id: 15,
    category_id: 8,
    warehouse_id: 115,
    name: 'Bath Tub Bayi Lipat',
    price: 200000,
    description: 'Bath tub bayi yang bisa dilipat untuk menghemat ruang',
    product_image: 'bath_tub.jpg',
    stock: 40,
    weight: 600
  },
  {
    id: 16,
    category_id: 8,
    warehouse_id: 116,
    name: 'Shampoo Bayi Organik',
    price: 50000,
    description: 'Shampoo bayi dengan bahan-bahan organik yang lembut di kulit',
    product_image: 'shampoo.jpg',
    stock: 65,
    weight: 200
  }
]

const seedWarehouse = async () => {
  await Promise.all(
    PRODUCT.map(async (warehouse) => {
      await prisma.wareHouse.upsert({
        where: { id: warehouse.id },
        update: {},
        create: warehouse
      })
    })
  )
}
