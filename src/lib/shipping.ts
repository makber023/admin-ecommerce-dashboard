export const SHIPPING_THRESHOLD = 6000;
export const SHIPPING_COST = 300;

export function calculateShipping(subtotal: number): number {
  return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}
