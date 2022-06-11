import { WhatsAppService } from './whatsapp.service'
import { OrderTextMessage } from './orderTextMessage.service'
import { MercadopagoService } from './mercadopago.service'

export class OrderService {
  static async sendOrder({ cart, order }) {
    const preference = await OrderService.getPreference(order, cart)

    const query = {
      phone: this.getPhoneNumber(order),
      text: OrderTextMessage.generateOrderMessage({ cart, order, preference }),
    }

    location.assign(WhatsAppService.generateUrl(query))
  }

  static async getPreference(order, cart) {
    if (order.payMethod.name !== 'MercadoPago') return

    return await MercadopagoService.generatePaymentLink({
      cart,
      order,
    })
  }

  static getPhoneNumber(order) {
    return order.branch.whatsapp_number
  }
}
