import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ClassificationSummaryRecord,
  MergedDfRecord,
  ToleranceSummaryRecord,
  TransactionSummaryRecord,
} from './types/process-data';

interface StoreState {
  merged_df: MergedDfRecord[];
  classification_summary: ClassificationSummaryRecord[];
  tolerance_summary: ToleranceSummaryRecord[];
  transaction_summary: TransactionSummaryRecord[];
  setMergedDf: (data: MergedDfRecord[]) => void;
  setClassificationSummary: (data: ClassificationSummaryRecord[]) => void;
  setToleranceSummary: (data: ToleranceSummaryRecord[]) => void;
  setTransactionSummary: (data: TransactionSummaryRecord[]) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      merged_df: [],
      classification_summary: [],
      tolerance_summary: [],
      transaction_summary: [],

      setMergedDf: (data) => set({ merged_df: data }),
      setClassificationSummary: (data) => set({ classification_summary: data }),
      setToleranceSummary: (data) => set({ tolerance_summary: data }),
      setTransactionSummary: (data) => set({ transaction_summary: data }),
    }),
    {
      name: 'INTERFACE-TRANSFORMATION',
      getStorage: () => localStorage,
    }
  )
);
