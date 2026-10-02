import React from 'react';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Printer, Download, Share2 } from 'lucide-react';

interface FooterProps {
  onDownloadPdf: () => void;
  onPrint: () => void;
  onShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onDownloadPdf,
  onPrint,
  onShare,
}) => {
  return (
    <footer className="bg-[#FAF6F0] border-t border-[#C5A059]/30 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center relative no-print">
      <div className="max-w-4xl mx-auto">
        
        {/* Auspicious Shloka Card */}
        <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#C5A059]/40 shadow-sm max-w-2xl mx-auto mb-8">
          <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center mx-auto mb-3 bg-[#FAF6F0] text-sm text-[#88243C]">
            🪷
          </div>
          <p className="font-devanagari text-base sm:text-lg text-[#88243C] font-semibold tracking-wide leading-relaxed">
            माङ्गल्यं तन्तुनानेन लोकभव्येन धार्यते ।<br />
            कण्ठे बध्नामि सुभगे सञ्जीव शरदः शतम् ॥
          </p>
          <p className="text-xs text-[#99742B] font-classic italic mt-2">
            "May the sacred union bring lifelong companionship, happiness, and prosperity."
          </p>
        </div>

        {/* Quick Footer Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={onDownloadPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF6F0] text-xs font-semibold text-[#6E1A2D] border border-[#C5A059]/40 hover:bg-[#FCEEE9] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Download Biodata PDF</span>
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF6F0] text-xs font-semibold text-[#6E1A2D] border border-[#C5A059]/40 hover:bg-[#FCEEE9] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Print Profile</span>
          </button>

          <button
            onClick={onShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF6F0] text-xs font-semibold text-[#6E1A2D] border border-[#C5A059]/40 hover:bg-[#FCEEE9] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Share Profile</span>
          </button>
        </div>

        <OrnamentalDivider className="my-4" />

        {/* Closing Note */}
        <p className="text-xs text-[#7A676A] mt-2">
          With blessings of the elders • Kumawat Family, Rajasthan
        </p>
        <p className="text-[11px] text-[#A69497] mt-1">
          Crafted with reverence as an elegant Digital Indian Marriage Biodata
        </p>

      </div>
    </footer>
  );
};
