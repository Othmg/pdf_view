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
import { Sidebar, MoreHorizontal } from 'lucide-react';

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
        
        <div className="flex-1 max-w-2xl">
          <SearchComponent>
            {(renderProps) => (
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={renderProps.keyword}
                    onChange={(e) => renderProps.setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && renderProps.keyword) {
                        renderProps.search();
                      }
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => renderProps.search()}
                    disabled={!renderProps.keyword}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Search
                  </button>
                  {renderProps.keyword && (
                    <button
                      onClick={() => {
                        renderProps.setKeyword('');
                        renderProps.clearHighlights();
                      }}
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20"
                    >
                      Clear
                    </button>
                  )}
                </div>
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