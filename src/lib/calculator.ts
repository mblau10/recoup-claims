/**
 * Calculate estimated IEEPA tariff refund.
 *
 * Formula: refund = importValue × (tariffRate/100) × (months/12) × 1.05
 * The 1.05 multiplier accounts for estimated interest CBP owes.
 */
export function calculateRefund(
  importValue: number,
  tariffRate: number,
  months: number
): number {
  return importValue * (tariffRate / 100) * (months / 12) * 1.05;
}

/**
 * Calculate advance amount (75% of estimated refund).
 */
export function calculateAdvance(refund: number): number {
  return refund * 0.75;
}
