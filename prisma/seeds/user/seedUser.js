const prisma = require('../../../libs/prisma')

const USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '$2b$10$Nxuq4LsyLr8Vx445B5ZsxeFv7TDN0gFp37w0Rc6TlEutCXzhN8rZ2', // password 12345678
    role: 'USER',
    city_id: 2,
    full_address: '123 Main St, Springfield',
    age: 30,
    gender: 'MALE',
    avatar: null,
    is_register_using_code: false,
    is_first_transaction: false,
  },
  {
    id: 2,
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '$2b$10$Nxuq4LsyLr8Vx445B5ZsxeFv7TDN0gFp37w0Rc6TlEutCXzhN8rZ2', // password 12345678
    role: 'ADMIN',
    city_id: 1,
    full_address: '456 Elm St, Metropolis',
    age: 28,
    gender: 'FEMALE',
    avatar: null,
    is_register_using_code: false,
    is_first_transaction: false,
  },
]

const seedUser = async () => {
  await Promise.all(
    USERS.map(async (user) => {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user
      })
    })
  )
}

module.exports = seedUser
