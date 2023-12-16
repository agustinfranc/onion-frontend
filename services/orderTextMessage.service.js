export class OrderTextMessage {
  static generateOrderMessage({ cart, order, preference }) {
    const message = []
    const separator = '\n'

    this.setTitle(message, order)
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

  static setTitle(message, order) {
    message.push('Hola, realicé un pedido a través de onion.ar')

    this.setClientDetails(message, order)

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
      if (product.options) this.setProductOptions(array, product)

      message.push(array.join(' - '))
    })
    message.push('')
  }

  static setProductOptions(array, product) {
    return Object.values(product.options).forEach((option) =>
      option.id
        ? array.push(option.name)
        : Array.isArray(option)
        ? option.forEach((item) => array.push(item.name))
        : Object.values(option).forEach((item) =>
            array.push(`${item.name} (${item.quantity})`)
          )
    )
  }

  static setOptionalOrderNote(message, order) {
    if (!order.note) return

    message.push('Nota al pedido:')
    message.push(order.note)
    message.push('')
  }

  static setClientDetails(message, order) {
    message.push('Nombre y apellido: ')
    message.push(order.client.name)
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
      message.push('(Hacé click en el link de arriba para pagar tu pedido)')
    }

    message.push('')
  }

  static setDeliveryAddress(message, order) {
    message.push(`${order.deliveryMethod.name}: `)

    order.deliveryMethod.id === 1
      ? message.push(this.getDeliveryAddress(order))
      : message.push(order.branch.address)

    message.push('')
  }
}
