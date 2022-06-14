export class WhatsAppService {
  static generateUrl(query) {
    const origin = 'https://api.whatsapp.com'
    const pathname = '/send'

    const params = new URLSearchParams(query)
    const rawUrl = new URL(`${origin}${pathname}?${params}`)

    return rawUrl.toString()
  }
}
