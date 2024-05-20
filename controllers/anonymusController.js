const shippingCost = require('../utils/shippingCost')

class AnonimusController {
  static async getAll(req, res, next) {
    try {
      const services = ['jne', 'tiki', 'pos']
      let recom = {}
      let shippingRecom = null

      for (const service of services) {
        const shipping = await shippingCost(1, 2, 1700, service)
        recom[service] = shipping

        // Jika costs tidak kosong, isi shippingRecom dan hentikan loop
        if (shipping && shipping[0] && shipping[0].costs && shipping[0].costs.length > 0) {
          const cost = shipping[0].costs[0]
          shippingRecom = {
            code: service,
            service: cost.service,
            cost: cost.cost,
          }
          break // Hentikan loop jika menemukan costs yang tidak kosong
        }
      }

      res.status(200).json({
        message: 'success',
        shippOption: recom,
        shippingRecom: shippingRecom,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AnonimusController
