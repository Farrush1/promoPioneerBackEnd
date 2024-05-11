Member:

1. Muhammad Syaifullah Al Arief
2. Muhammad Luthfi Zuhair
3. Muhammad Farras Amali
4. Weli Erlina
5. Fahdi Alan Fawwazi

Langkah Setup :
- Install package `npm i` atau `yarn`
- Create database di komputer lokal 
- Setup .env merujuk dari .env.example dan sesuaikan
- Pastikan prisma terinstal
- Jalankan `npx prisma migrate dev` untuk menerapkan schema database
- Pastikan RAJAONGKIR_API_KEY terisi 
- Jalankan `npx prisma db seed` untuk mengisi table City sesuai data dari Rajaongkir API
- Jalankan `yarn start`