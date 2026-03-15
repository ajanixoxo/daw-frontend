/**
 * Formats a numeric price with the correct currency symbol and locale formatting.
 * Defaults to Nigerian Naira (₦) when no currency is provided.
 */
export function formatPrice(price: number, currency?: string | null): string {
  const isUSD = currency === "USD";
  const symbol = isUSD ? "$" : "₦";
  const locale = isUSD ? "en-US" : "en-NG";
  return `${symbol}${price.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Returns the formatted display price for a product.
 * Always uses the product's native price and currency — never a converted value.
 * This ensures a product listed in ₦ shows ₦ everywhere (listing, details, cart).
 */
export function productPrice(product: {
  price: number;
  currency?: string | null;
}): string {
  return formatPrice(product.price, product.currency);
}
