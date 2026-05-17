export function formatGridPrice(price: number) {
  return `¥${price.toLocaleString("en-US")}+tax`;
}
