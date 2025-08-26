'use client';

import { DocumentSummary } from '@/types/document';
import { formatFileSize } from '@/lib/api';

interface SummaryDisplayProps {
  summary: DocumentSummary;
  onReset: () => void;
}

export default function SummaryDisplay({ summary, onReset }: SummaryDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Processed</h2>
          <p className="text-sm text-gray-500 mt-1">
            Processed on {formatDate(summary.processedAt)}
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Process Another Document
        </button>
      </div>

      {/* Document Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Document Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Filename</p>
            <p className="text-sm text-gray-900 truncate" title={summary.filename}>
              {summary.filename}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">File Size</p>
            <p className="text-sm text-gray-900">{formatFileSize(summary.size)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Type</p>
            <p className="text-sm text-gray-900">
              {summary.mimeType === 'application/pdf' ? 'PDF' : 'Word Document'}
            </p>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">AI-Generated Summary</h3>
            <button
              onClick={() => copyToClipboard(summary.summary)}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Summary
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {summary.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Content */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Extracted Content</h3>
            <button
              onClick={() => copyToClipboard(summary.content)}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Content
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {summary.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}