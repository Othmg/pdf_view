import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div className="w-full h-full min-h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#0c747f] p-4 flex items-center gap-2">
        <FileText className="text-white" size={24} />
        <h2 className="text-white text-xl font-semibold">Medical Document Viewer</h2>
      </div>
      <div className="h-[calc(100%-4rem)]">
        <Worker workerUrl={`https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
          <Viewer 
            fileUrl={pdfUrl}
            withCredentials={false}
          />
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;