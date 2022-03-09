export class OrderService {
  static sendOrder({ cart, order, preference }) {
    const origin = 'https://api.whatsapp.com'
    const pathname = '/send'

    const phone = this.getPhoneNumber(order)
    const text = this.getText({ cart, order, preference })

    const query = { phone, text }
    const params = new URLSearchParams(query)

    const rawUrl = new URL(`${origin}${pathname}?${params}`)
    const url = rawUrl.toString()

    location.assign(url)
  }

  static getPhoneNumber(order) {
    return order.branch.whatsapp_number
  }

  static getText({ cart, order, preference }) {
    const message = []
    const separator = '\n'

    this.setTitle(message)
    this.setProductDetails(message, cart)
    this.setOptionalOrderNote(message, order)
    this.setOrderTotal(message, cart)
    this.setPayMethod(message, order, preference)
    this.setDeliveryAddress(message, order)

    return message.join(separator)
  }

  static getSubtotal(cart) {
    return cart.reduce(
      (previous, current) => previous + current.price * current.quantity,
      0
    )
  }

  static getDeliveryAddress(order) {
    const array = [order.address.address]
    if (order.address.floor) array.push(order.address.floor)
    if (order.address.description) array.push(order.address.description)

    return array.join(', ')
  }

  static setTitle(message) {
    message.push('Realicé un pedido a través de onion.ar')
    message.push('Este es el detalle:')
    message.push('')
  }

  static setProductDetails(message, cart) {
    cart.forEach((product) => {
      const array = [
        product.quantity,
        product.name,
        `$${product.price * product.quantity}`,
      ]
      if (product.note) array.push(product.note)

      message.push(array.join(' - '))
    })
    message.push('')
  }

  static setOptionalOrderNote(message, order) {
    if (!order.note) return

    message.push('Nota al pedido:')
    message.push(order.note)
    message.push('')
  }

  static setOrderTotal(message, cart) {
    message.push('Total del pedido:')
    message.push('$' + this.getSubtotal(cart))
    message.push('')
  }

  static setPayMethod(message, order, preference) {
    message.push('Forma de pago:')
    message.push(order.payMethod.name)

    if (order.payMethod.name === 'MercadoPago') {
      message.push(preference.init_point)
    }

    message.push('')
  }

  static setDeliveryAddress(message, order) {
    message.push('Dirección:')
    message.push(this.getDeliveryAddress(order))
    message.push('')
  }
}
