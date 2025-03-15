import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div className="w-full h-full">
      <object
        data={pdfUrl}
        type="application/pdf"
        className="w-full h-full"
      >
        <p>
          It appears your browser doesn't support embedded PDFs.
          <a href={pdfUrl} className="text-blue-600 hover:underline ml-1">
            Click here to download the PDF
          </a>
        </p>
      </object>
    </div>
  );
};

export default PDFViewer;