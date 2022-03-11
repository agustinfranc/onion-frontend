import axios from 'axios'

export class MercadopagoService {
  static async generatePaymentLink({ cart, order }) {
    const items = this.getItems(cart)
    const data = {
      items,
      commerce_branch: order.branch.id,
    }

    const url = process.env.API_URL + 'checkout/preferences'
    const res = await axios.post(url, data)
    return res.data
  }

  static getItems(cart) {
    return cart.map((product) => ({
      title: product.name,
      quantity: product.quantity,
      unit_price: product.price,
    }))
  }
}
