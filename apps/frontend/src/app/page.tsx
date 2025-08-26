'use client';

import { useState } from 'react';
import DocumentUpload from '@/components/DocumentUpload';
import SummaryDisplay from '@/components/SummaryDisplay';
import { DocumentSummary } from '@/types/document';

export default function Home() {
  const [documentSummary, setDocumentSummary] = useState<DocumentSummary | null>(null);

  const handleSummaryGenerated = (summary: DocumentSummary) => {
    setDocumentSummary(summary);
  };

  const handleReset = () => {
    setDocumentSummary(null);
  };

  return (
    <div className="px-4 sm:px-0">
      {!documentSummary ? (
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Process Your Documents
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Upload PDF or Word documents to extract content and get AI-powered summaries. 
              Our system uses advanced natural language processing to understand and summarize your documents.
            </p>
          </div>
          
          <DocumentUpload onSummaryGenerated={handleSummaryGenerated} />
          
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-900">1. Upload Document</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Upload your PDF or Word document (up to 10MB)
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-900">2. AI Processing</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Our AI extracts content and generates intelligent summaries
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-900">3. Get Results</h4>
                <p className="mt-2 text-sm text-gray-500">
                  View extracted content and comprehensive summaries
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SummaryDisplay summary={documentSummary} onReset={handleReset} />
      )}
    </div>
  );
}