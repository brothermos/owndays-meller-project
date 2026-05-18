export function formatGridPrice(price: number) {
  return `¥${price.toLocaleString("en-US")}+tax`;
}

export function formatModalPrice(price: number) {
  return `¥${price.toLocaleString("en-US")} 税込`;
}
