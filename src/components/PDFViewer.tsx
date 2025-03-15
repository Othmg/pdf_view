import React, { useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { searchPlugin } from '@react-pdf-viewer/search';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import * as pdfjsLib from 'pdfjs-dist';
import { Search, Sidebar, MoreHorizontal } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);

  // Initialize plugins
  const searchPluginInstance = searchPlugin();
  const thumbnailPluginInstance = thumbnailPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const zoomPluginInstance = zoomPlugin();

  const { Thumbnails } = thumbnailPluginInstance;
  const { Toolbar } = toolbarPluginInstance;
  const { Search: SearchComponent } = searchPluginInstance;

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Top Bar with Search */}
      <div className="bg-gradient-to-r from-[#0c747f] to-[#0c747f]/90 text-white p-3 flex items-center gap-4 shadow-md">
        <button
          onClick={() => setShowThumbnail(!showThumbnail)}
          className="p-2 hover:bg-[#0c747f]/80 rounded-lg transition-colors"
          title="Toggle thumbnails"
        >
          <Sidebar className="w-5 h-5" />
        </button>
        
        <div className="flex-1">
          <SearchComponent>
            {(props) => (
              <div className="relative">
                <input
                  className="w-full max-w-2xl px-4 py-2 text-gray-900 bg-white/95 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c747f]/30 placeholder-gray-500"
                  placeholder="Search in document..."
                  onChange={(e) => props.setKeyword(e.target.value)}
                  value={props.keyword}
                />
                {props.keyword && (
                  <div className="absolute right-2 top-2 flex gap-1">
                    <button
                      className="p-1 hover:bg-gray-100 rounded text-[#0c747f]"
                      onClick={props.jumpToPreviousMatch}
                    >
                      ↑
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded text-[#0c747f]"
                      onClick={props.jumpToNextMatch}
                    >
                      ↓
                    </button>
                  </div>
                )}
              </div>
            )}
          </SearchComponent>
        </div>

        <button
          onClick={() => setShowToolbar(!showToolbar)}
          className="p-2 hover:bg-[#0c747f]/80 rounded-lg transition-colors"
          title="More options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex relative">
        {/* Thumbnails Sidebar */}
        <div
          className={`${
            showThumbnail ? 'absolute lg:relative' : 'hidden'
          } z-10 w-64 bg-white border-r h-full overflow-auto shadow-lg`}
        >
          <div className="p-2">
            <Thumbnails />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full relative">
          {/* Floating Toolbar */}
          <div
            className={`${
              showToolbar ? 'block' : 'hidden'
            } absolute right-4 top-4 z-20 bg-white rounded-lg shadow-xl border`}
          >
            <Toolbar />
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <Worker
              workerUrl={`https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}
            >
              <Viewer
                fileUrl={pdfUrl}
                plugins={[
                  searchPluginInstance,
                  thumbnailPluginInstance,
                  toolbarPluginInstance,
                  zoomPluginInstance,
                ]}
                defaultScale={SpecialZoomLevel.PageFit}
                withCredentials={false}
                theme={{
                  theme: {
                    primary: '#0c747f',
                    secondary: '#0c747f',
                  },
                }}
              />
            </Worker>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;