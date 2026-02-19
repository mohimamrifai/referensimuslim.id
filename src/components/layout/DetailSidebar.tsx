'use client';

import { 
  Share2, 
  Quote, 
  Printer, 
  CheckCircle, 
  Download
} from 'lucide-react';
import { ContentType } from './detail-types';

interface DetailSidebarProps {
  type: ContentType;
  readingProgress: number;
  quoteResult: string | null;
  onShare: () => void;
  onQuote: () => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
}

export default function DetailSidebar({
  type,
  readingProgress,
  quoteResult,
  onShare,
  onQuote,
  onPrint,
  onDownloadPdf
}: DetailSidebarProps) {
  return (
    <div className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-24 space-y-4">
        
        {/* Reading Progress */}
        {type === 'artikel' && (
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Progress Baca</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-xl font-bold text-orange-600">{Math.round(readingProgress)}%</span>
              <span className="text-sm text-gray-500 mb-1">selesai</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-orange-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <button 
            onClick={onShare}
            className="w-full flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border border-gray-100 hover:border-orange-100 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full group-hover:bg-orange-100 flex items-center justify-center transition-colors border border-gray-200 group-hover:border-transparent">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Bagikan Konten</span>
          </button>

          <button 
            onClick={onQuote}
            className="w-full flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border border-gray-100 hover:border-orange-100 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full group-hover:bg-orange-100 flex items-center justify-center transition-colors border border-gray-200 group-hover:border-transparent">
              <Quote className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Kutip Konten</span>
          </button>

          {quoteResult && (
            <div className="p-3 bg-green-50 rounded-md border border-green-100 text-xs animate-in fade-in slide-in-from-top-2">
              <p className="font-bold text-green-700 mb-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Disalin!
              </p>
              <p className="text-gray-600 italic leading-relaxed">{quoteResult}</p>
            </div>
          )}

          {type === 'artikel' && (
            <button 
              onClick={onDownloadPdf}
              className="w-full flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border border-gray-100 hover:border-orange-100 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full group-hover:bg-orange-100 flex items-center justify-center transition-colors border border-gray-200 group-hover:border-transparent">
                <Download className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">Download PDF</span>
            </button>
          )}

          <button 
            onClick={onPrint}
            className="w-full flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border border-gray-100 hover:border-orange-100 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full group-hover:bg-orange-100 flex items-center justify-center transition-colors border border-gray-200 group-hover:border-transparent">
              <Printer className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Cetak Halaman</span>
          </button>
        </div>
      </div>
    </div>
  );
}
