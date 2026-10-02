import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface PhotoLightboxProps {
  isOpen: boolean;
  photoUrl: string | null;
  onClose: () => void;
  title: string;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  photoUrl,
  onClose,
  title,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !photoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn no-print">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 text-white">
        <div className="flex items-center gap-2">
          <span className="text-[#DFBE76]">✦</span>
          <span className="font-serif text-sm sm:text-base tracking-wide text-[#FDFBF7]">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={photoUrl}
            download="Meenakshi_Kumawat_Photograph.jpg"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Download Photograph"
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Centered Image with Elegant Frame */}
      <div className="relative max-w-4xl max-h-[85vh] p-2 rounded-2xl bg-gradient-to-b from-[#DFBE76]/60 to-[#88243C]/60 shadow-2xl flex items-center justify-center">
        <img
          src={photoUrl}
          alt={title}
          className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
        />
      </div>
    </div>
  );
};
