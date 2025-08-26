export interface DocumentSummary {
  filename: string;
  content: string;
  summary: string;
  processedAt: string;
  size: number;
  mimeType: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}