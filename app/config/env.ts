const DEFAULT_API_BASE_URL = "https://api-one-alpha-60.vercel.app";
const DEFAULT_PRODUCT_IMAGE_BASE_URL = "https://storage.owndays.com/storage/";
const DEFAULT_ONLINE_STORE_BASE = "https://www.owndays.com/jp/ja/products";

function getEnv(key: string, fallback: string) {
  return process.env[key] ?? fallback;
}

function normalizeBaseUrl(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}

export const API_BASE_URL = getEnv("NEXT_PUBLIC_API_BASE_URL", DEFAULT_API_BASE_URL);

export const PRODUCT_IMAGE_BASE_URL = normalizeBaseUrl(
  getEnv("NEXT_PUBLIC_IMAGE_BASE_URL", DEFAULT_PRODUCT_IMAGE_BASE_URL),
);

export const PRODUCTS_API_PATH = "/meller/products.json";

export const ONLINE_STORE_BASE = normalizeBaseUrl(getEnv("NEXT_PUBLIC_ONLINE_STORE_BASE", DEFAULT_ONLINE_STORE_BASE));
