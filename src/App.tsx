import React from 'react';
import PDFViewer from './components/PDFViewer';
import { Stethoscope } from 'lucide-react';

function App() {
  const pdfUrl = '/assets/SMPR-hug.pdf';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-[#0c747f]" />
              <span className="ml-2 text-xl font-semibold text-[#0c747f]">MedSignal</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Medical Document Review</h1>
          <p className="text-gray-600">
            Use our advanced PDF viewer to examine medical documents with precision and ease.
          </p>
        </div>

        <div className="h-[800px]">
          <PDFViewer pdfUrl={pdfUrl} />
        </div>
      </main>

      <footer className="bg-white mt-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">© 2024 MedSignal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;