enum ErrorLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
}
interface LogResponse {
  level: ErrorLevel;
  message: string;
  context: string;
  timestamp: string;
  id: number;
  error_type: 'INFO';
  additional_info: {
    final_df_shape: [2896, 6];
  };
}
export type { LogResponse };
