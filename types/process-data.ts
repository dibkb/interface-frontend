interface MergedDfRecord {
  InvoiceDate: number | null;
  TransactionType_mtr: string | null;
  OrderId: string;
  ShipmentDate: number | null;
  OrderDate: number | null;
  ShipmentItemId: number | null;
  ItemDescription: string | null;
  InvoiceAmount: number | null;
  PaymentDate: string | null;
  PaymentType: string | null;
  Description: string | null;
  Total: number | null;
  TransactionType_payment: string | null;
  NetAmount: number | null;
  mark: string;
  ToleranceCheck: string | null;
}

interface ClassificationSummaryRecord {
  mark: string;
  count: number;
}

interface ToleranceSummaryRecord {
  ToleranceCheck: string;
  Count: number;
}

interface TransactionSummaryRecord {
  Description: string;
  NetAmount: number;
}

interface ResponseData {
  merged_df: MergedDfRecord[];
  classification_summary: ClassificationSummaryRecord[];
  tolerance_summary: ToleranceSummaryRecord[];
  transaction_summary: TransactionSummaryRecord[];
}

export type {
  MergedDfRecord,
  ToleranceSummaryRecord,
  ClassificationSummaryRecord,
  TransactionSummaryRecord,
  ResponseData,
};
