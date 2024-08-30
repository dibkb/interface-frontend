enum ErrorLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
}
interface LogInterface {
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
interface LogResponse {
  results: LogInterface[];
  current_page: number;
  total_page: number;
}
export type { LogResponse };
