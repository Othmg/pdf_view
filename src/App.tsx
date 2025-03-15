import React from 'react';
import PDFViewer from './components/PDFViewer';

function App() {
  const pdfUrl = '/assets/SMPR-hug.pdf';

  return (
    <div className="h-screen">
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
}

export default App;