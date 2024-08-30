import type { MergedDfRecord } from '@/types/process-data';

export function calculateToleranceBreach(df: MergedDfRecord[]) {
  return df.reduce((acc, cur) => {
    if (cur.ToleranceCheck === 'Tolerance Breached') {
      acc++;
    }
    return acc;
  }, 0);
}
