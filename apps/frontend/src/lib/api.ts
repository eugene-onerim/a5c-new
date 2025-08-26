import axios, { AxiosProgressEvent } from 'axios';
import { DocumentSummary, UploadProgress } from '@/types/document';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
  timeout: 120000, // 2 minute timeout for file uploads
});

export const uploadDocument = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<DocumentSummary> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<DocumentSummary>('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress({
          loaded: progressEvent.loaded,
          total: progressEvent.total,
          percentage,
        });
      }
    },
  });

  return response.data;
};

export const validateFile = (file: File): string | null => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ];

  if (file.size > maxSize) {
    return 'File size must be less than 10MB';
  }

  if (!allowedTypes.includes(file.type)) {
    return 'Only PDF and Word documents are allowed';
  }

  return null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};