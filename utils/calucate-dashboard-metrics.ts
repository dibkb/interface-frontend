import type { MergedDfRecord } from '@/types/process-data';

export function calculateToleranceBreach(df: MergedDfRecord[]) {
  return df.reduce((acc, cur) => {
    if (cur.ToleranceCheck === 'Tolerance Breached') {
      acc++;
    }
    return acc;
  }, 0);
}
export function calculateTotalOrderAndPayment(df: MergedDfRecord[]) {
  return df.reduce((acc, cur) => {
    if (cur.mark === 'Order & Payment Received') {
      acc++;
    }
    return acc;
  }, 0);
}
export function calculatePaymentPending(df: MergedDfRecord[]) {
  return df.reduce((acc, cur) => {
    if (cur.mark === 'Payment Pending') {
      acc++;
    }
    return acc;
  }, 0);
}
