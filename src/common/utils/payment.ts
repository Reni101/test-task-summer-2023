export const paymentResult = (payment_from: number, payment_to: number, currency: string) => {
  if (payment_from > 0 && payment_to === 0) {
    return `з/п от ${payment_from} ${currency}`
  }
  if (payment_from === 0 && payment_to > 0) {
    return `з/п до ${payment_to} ${currency}`
  }
  if (payment_from > 0 && payment_to >= payment_from) {
    return payment_from === payment_to
      ? `з/п ${payment_from} ${currency}`
      : `з/п ${payment_from} - ${payment_to} ${currency}`
  }
}
