const prisma = require('../../../libs/prisma')

const PRODUCT = [
  {
    id: 1,
    category_id: 1,
    warehouse_id: 1,
    name: 'Cute Baby Jumper',
    price: 150000,
    description: 'Soft and comfortable baby jumper with cute design',
    product_image:
      'http://res.cloudinary.com/dmvigke9d/image/upload/v1715843457/gvjzgghwtccjqv3xmluq.jpg',
    stock: 50,
    weight: 150,
  },
  {
    id: 2,
    category_id: 1,
    warehouse_id: 2,
    name: 'Plain Baby Set',
    price: 120000,
    description: 'Baby shirt and pants set with bright plain colors',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715843552/zhrlt1pqjfanqwbyqktq.jpg',
    stock: 70,
    weight: 120,
  },

  {
    id: 3,
    category_id: 2,
    warehouse_id: 3,
    name: 'Baby Spoon and Fork Set',
    price: 50000,
    description: 'Baby spoon and fork set with ergonomic design, safe for babies',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715843615/vas1ak4qf4rwm2yvr5gd.jpg',
    stock: 100,
    weight: 50,
  },
  {
    id: 4,
    category_id: 2,
    warehouse_id: 4,
    name: 'Non-Spill Baby Plate',
    price: 70000,
    description: 'Baby plate with non-spill suction cup, easy to clean',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715843655/y3ygtxb3ncriqvxkhj4i.jpg',
    stock: 80,
    weight: 70,
  },

  {
    id: 5,
    category_id: 3,
    warehouse_id: 5,
    name: 'Disposable Diapers',
    price: 100000,
    description: 'Disposable diapers with high absorbency, gentle on baby skin',
    product_image:
      'http://res.cloudinary.com/dmvigke9d/image/upload/v1715843693/fhggv1ebfhvekljvnoko.jpg',
    stock: 120,
    weight: 100,
  },
  {
    id: 6,
    category_id: 3,
    warehouse_id: 6,
    name: 'Cloth Diapers',
    price: 80000,
    description: 'Environmentally friendly cloth diapers, suitable for sensitive skin',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715843693/fhggv1ebfhvekljvnoko.jpg',
    stock: 90,
    weight: 80,
  },

  {
    id: 7,
    category_id: 4,
    warehouse_id: 7,
    name: 'Anti-Colic Baby Bottle',
    price: 60000,
    description: 'Baby bottle with anti-colic design to reduce gas',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715843953/rxchu7fcki8ueqecpza4.jpg',
    stock: 60,
    weight: 70,
  },
  {
    id: 8,
    category_id: 4,
    warehouse_id: 8,
    name: 'Bottle Sterilizer',
    price: 250000,
    description: 'Practical and safe bottle sterilizer',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844007/oufqpjc5iqalmscguhej.jpg',
    stock: 40,
    weight: 150,
  },

  {
    id: 9,
    category_id: 5,
    warehouse_id: 9,
    name: 'Lightweight Foldable Stroller',
    price: 800000,
    description: 'Lightweight foldable stroller, easy to carry while traveling',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844029/b0xahygld3jc31faee5o.jpg',
    stock: 30,
    weight: 500,
  },
  {
    id: 10,
    category_id: 5,
    warehouse_id: 10,
    name: '3-Wheel Baby Stroller',
    price: 1200000,
    description: 'Baby stroller with stable wheels and 360-degree swivel',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844094/xcuyo4bqgkstxj5twihj.jpg',
    stock: 20,
    weight: 800,
  },

  {
    id: 11,
    category_id: 6,
    warehouse_id: 11,
    name: 'Foldable Baby Bed',
    price: 500000,
    description: 'Foldable baby bed with sturdy frame and comfortable mattress',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844164/rffcmdcmnimkuckbibag.jpg',
    stock: 25,
    weight: 1000,
  },
  {
    id: 12,
    category_id: 6,
    warehouse_id: 12,
    name: 'Cute Baby Night Light',
    price: 150000,
    description: 'Baby night light with cute design and soft light',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844188/z4gdvgvno8ee5nscjeuj.jpg',
    stock: 35,
    weight: 300,
  },

  {
    id: 13,
    category_id: 7,
    warehouse_id: 13,
    name: 'Playful Baby Bolster',
    price: 90000,
    description: 'Colorful baby bolster with various hanging toys',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844213/eftwb69uf09oj9qxwgns.jpg',
    stock: 45,
    weight: 200,
  },
  {
    id: 14,
    category_id: 7,
    warehouse_id: 14,
    name: 'Interactive Baby Book',
    price: 75000,
    description: 'Baby book with cute pictures and entertaining sounds',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844236/nurx4jmpcmbrtrzjnonl.jpg',
    stock: 55,
    weight: 150,
  },

  {
    id: 15,
    category_id: 8,
    warehouse_id: 15,
    name: 'Foldable Baby Bath Tub',
    price: 200000,
    description: 'Foldable baby bath tub to save space',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844260/ml92hnt6dpqp5cg2i9l6.jpg',
    stock: 40,
    weight: 600,
  },
  {
    id: 16,
    category_id: 8,
    warehouse_id: 16,
    name: 'Organic Baby Shampoo',
    price: 50000,
    description: 'Baby shampoo with organic ingredients, gentle on skin',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844291/vn0ht7jpl7evy7ith7kk.jpg',
    stock: 65,
    weight: 200,
  },
  {
    id: 17,
    category_id: 9,
    warehouse_id: 17,
    name: 'Electric Breast Pump',
    price: 300000,
    description: 'Electric breast pump for convenient and efficient milk expression',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844324/eunyci7lqs0etff58sth.jpg',
    stock: 25,
    weight: 600,
  },
  {
    id: 18,
    category_id: 9,
    warehouse_id: 18,
    name: 'Manual Breast Pump',
    price: 150000,
    description: 'Manual breast pump for occasional milk expression, compact and easy to use',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844350/xuqb8t2i0hympojpu4jz.jpg',
    stock: 35,
    weight: 300,
  },
  {
    id: 19,
    category_id: 10,
    warehouse_id: 19,
    name: 'Baby Monitor',
    price: 400000,
    description: 'Baby monitor with camera and audio for remote monitoring',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844371/cuvjit3zvqzly6o3wbbx.jpg',
    stock: 20,
    weight: 400,
  },
  {
    id: 20,
    category_id: 10,
    warehouse_id: 20,
    name: 'Baby Safety Gate',
    price: 250000,
    description: 'Safety gate to restrict baby s access to certain areas of the house',
    product_image:
      'https://res.cloudinary.com/dmvigke9d/image/upload/v1715844391/qitbsha3imprw0qb6f1v.jpg',
    stock: 30,
    weight: 800,
  },
]

const seedProduct = async () => {
  await Promise.all(
    PRODUCT.map(async (product) => {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: product,
      })
    }),
  )
}

module.exports = seedProduct
