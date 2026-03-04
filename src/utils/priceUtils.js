// Price calculation utilities

/**
 * Format price to currency format
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Calculate subtotal from cart items
 * @param {Array} items - Array of cart items
 * @returns {number} Subtotal amount
 */
export const calculateSubtotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Calculate service charge (5% of subtotal)
 * @param {number} subtotal - Subtotal amount
 * @param {number} rate - Service charge rate (default: 0.05 for 5%)
 * @returns {number} Service charge amount
 */
export const calculateServiceCharge = (subtotal, rate = 0.05) => {
  return subtotal * rate;
};

/**
 * Calculate grand total (subtotal + service charge)
 * @param {number} subtotal - Subtotal amount
 * @param {number} serviceCharge - Service charge amount
 * @returns {number} Grand total amount
 */
export const calculateGrandTotal = (subtotal, serviceCharge) => {
  return subtotal + serviceCharge;
};

/**
 * Calculate all totals from cart items
 * @param {Array} items - Array of cart items
 * @param {number} serviceRate - Service charge rate (default: 0.05)
 * @returns {Object} Object containing all calculated totals
 */
export const calculateAllTotals = (items, serviceRate = 0.05) => {
  const subtotal = calculateSubtotal(items);
  const serviceCharge = calculateServiceCharge(subtotal, serviceRate);
  const grandTotal = calculateGrandTotal(subtotal, serviceCharge);
  
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    serviceCharge: parseFloat(serviceCharge.toFixed(2)),
    grandTotal: parseFloat(grandTotal.toFixed(2))
  };
};

/**
 * Calculate total number of items in cart
 * @param {Array} items - Array of cart items
 * @returns {number} Total number of items
 */
export const calculateTotalItems = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Apply discount to price
 * @param {number} price - Original price
 * @param {number} discountPercent - Discount percentage (e.g., 10 for 10%)
 * @returns {number} Discounted price
 */
export const applyDiscount = (price, discountPercent) => {
  return price * (1 - discountPercent / 100);
};

/**
 * Calculate tax amount
 * @param {number} amount - Base amount
 * @param {number} taxRate - Tax rate (e.g., 0.08 for 8%)
 * @returns {number} Tax amount
 */
export const calculateTax = (amount, taxRate) => {
  return amount * taxRate;
};
