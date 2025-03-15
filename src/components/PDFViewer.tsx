import React, { useRef, useState } from 'react';
import { Search } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [searchText, setSearchText] = useState('');
  const objectRef = useRef<HTMLObjectElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger browser's find functionality
    if (searchText) {
      // Focus the PDF object first
      objectRef.current?.focus();

      // Use window.find() to trigger browser search
      window.find(searchText, false, false, true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Search Bar */}
      <div className="bg-white border-b p-4 shadow-sm">
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search in PDF..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1">
        <object
          ref={objectRef}
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
    </div>
  );
};

export default PDFViewer;