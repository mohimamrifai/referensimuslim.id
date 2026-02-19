'use client';

import { useState, useEffect } from 'react';
import { incrementView } from '@/app/actions/content';
import DetailMainContent from './DetailMainContent';
import DetailSidebar from './DetailSidebar';
import { ContentType, ContentData, DetailLayoutProps } from './detail-types';

// Re-export types for backward compatibility if needed
export type { ContentType, ContentData };

export default function DetailLayout({ type, data, children }: DetailLayoutProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [quoteResult, setQuoteResult] = useState<string | null>(null);

  // Increment View Count after 30 seconds
  useEffect(() => {
    if (!data.slug) return;

    const timer = setTimeout(() => {
      incrementView(data.slug);
    }, 30000);

    return () => clearTimeout(timer);
  }, [data.slug]);

  // Handle Reading Progress
  useEffect(() => {
    if (type !== 'artikel') return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [type]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('printable-content');
    if (!element) return;

    try {
      // Clone the element to manipulate it for PDF generation
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Remove breadcrumb (nav)
      const nav = clone.querySelector('nav');
      if (nav) nav.remove();

      // Remove all icons (svg)
      const icons = clone.querySelectorAll('svg');
      icons.forEach(icon => icon.remove());

      // Remove no-print elements
      const noPrint = clone.querySelectorAll('.no-print');
      noPrint.forEach(el => el.remove());

      // Remove styling (colors, backgrounds, shadows, borders)
      const allElements = clone.querySelectorAll('*');
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.color = '#000000';
          el.style.backgroundColor = 'transparent';
          el.style.boxShadow = 'none';
          el.style.border = 'none';
          el.style.borderRadius = '0';
          
          // Remove common Tailwind layout/color classes
          el.classList.remove(
            'bg-orange-100', 'text-orange-700', 'text-orange-600', 
            'bg-gray-100', 'bg-gray-50', 'text-gray-900', 'text-gray-500', 'text-gray-600',
            'shadow-sm', 'border', 'border-gray-100', 'border-gray-200', 'rounded-md', 'rounded-full'
          );
        }
      });
      
      // Remove specific prose color class
      const article = clone.querySelector('article');
      if (article) {
        article.classList.remove('prose-orange');
      }

      // Create a temporary container to render the clone
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = element.offsetWidth + 'px'; // Match original width
      container.appendChild(clone);
      document.body.appendChild(container);

      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt = {
        margin: [0.5, 0.5] as [number, number],
        filename: `${data.slug}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(clone).save();

      // Clean up
      document.body.removeChild(container);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal mengunduh PDF. Silakan coba lagi.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        url: window.location.href,
      });
    } else {
      alert('Fitur share tidak didukung di browser ini.');
    }
  };

  const handleQuote = () => {
    const citation = `"${data.title}" oleh ${data.author.name}. Referensimuslim.id. Diakses pada ${new Date().toLocaleDateString('id-ID')}.`;
    navigator.clipboard.writeText(citation).then(() => {
      setQuoteResult(citation);
      setTimeout(() => setQuoteResult(null), 10000); // Hide after 10s
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Content Area (Center) */}
        <DetailMainContent type={type} data={data}>
          {children}
        </DetailMainContent>

        {/* Right Sticky Panel */}
        <DetailSidebar 
          type={type}
          readingProgress={readingProgress}
          quoteResult={quoteResult}
          onShare={handleShare}
          onQuote={handleQuote}
          onPrint={handlePrint}
          onDownloadPdf={handleDownloadPdf}
        />

      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-content, #printable-content * {
            visibility: visible;
          }
          #printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          #printable-content nav {
            display: none !important;
          }
          #printable-content svg {
            display: none !important;
          }
          .no-print {
            display: none !important;
          }
          #printable-content * {
            background-color: transparent !important;
            color: #000 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          #printable-content img {
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
