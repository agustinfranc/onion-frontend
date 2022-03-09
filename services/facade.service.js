import { MercadopagoService } from './mercadopago.service'
import { OrderService } from './order.service'

// TODO: rename facade
export class FacadeService {
  static async sendOrder({ cart, order }) {
    const preference = await MercadopagoService.generatePaymentLink({
      cart,
      order,
    })
    OrderService.sendOrder({ cart, order, preference })
  }
}
