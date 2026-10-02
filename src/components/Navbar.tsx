import React, { useState, useEffect } from 'react';
import { Download, Share2, Edit3, Volume2, VolumeX, Menu, X, Printer } from 'lucide-react';

interface NavbarProps {
  onOpenEdit: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onShare: () => void;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEdit,
  onDownloadPdf,
  onPrint,
  onShare,
  isAudioPlaying,
  toggleAudio,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'Personal Details', href: '#personal' },
    { name: 'Education & Career', href: '#education' },
    { name: 'Family Background', href: '#family' },
    { name: 'Gotra Heritage', href: '#gotra' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-md border-b border-[#C5A059]/30 py-2.5'
          : 'bg-[#FAF6F0]/80 backdrop-blur-sm border-b border-[#C5A059]/20 py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Crest */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center bg-[#FDFBF7] shadow-sm text-[#88243C] group-hover:scale-105 transition-transform">
            🪷
          </div>
          <div>
            <span className="font-serif font-bold text-lg tracking-wider text-[#6E1A2D] group-hover:text-[#88243C] transition-colors">
              MEENAKSHI
            </span>
            <span className="text-[10px] tracking-widest uppercase block text-[#C5A059] font-medium">
              Matrimonial Profile
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#4A3B3E]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#88243C] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#C5A059] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            title={isAudioPlaying ? 'Mute traditional ambiance music' : 'Play traditional ambiance music'}
            className="p-2 rounded-full border border-[#C5A059]/40 bg-[#FDFBF7] text-[#6E1A2D] hover:bg-[#FCEEE9] hover:border-[#C5A059] transition-all shadow-sm"
            aria-label="Toggle ambiance music"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 text-[#88243C] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#6A5C5E]" />
            )}
          </button>

          {/* Share */}
          <button
            onClick={onShare}
            title="Share Profile"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#FDFBF7] text-xs font-medium text-[#6E1A2D] hover:bg-[#FCEEE9] hover:border-[#C5A059] transition-all shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          {/* Print */}
          <button
            onClick={onPrint}
            title="Print Profile"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#FDFBF7] text-xs font-medium text-[#6E1A2D] hover:bg-[#FCEEE9] hover:border-[#C5A059] transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          {/* Edit Mode Button */}
          <button
            onClick={onOpenEdit}
            title="Edit Profile Details"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C5A059] bg-[#FDFBF7] text-xs font-medium text-[#88243C] hover:bg-[#88243C] hover:text-[#FFF] transition-all shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit Details</span>
          </button>

          {/* PDF Download Button */}
          <button
            onClick={onDownloadPdf}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#88243C] to-[#6E1A2D] text-white text-xs font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition-all border border-[#DFBE76]/40"
          >
            <Download className="w-3.5 h-3.5 text-[#F3E5AB]" />
            <span>PDF Biodata</span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#6E1A2D] hover:bg-[#FCEEE9] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#C5A059]/30 px-6 py-4 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#4A3B3E]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#C5A059]/10 hover:text-[#88243C] flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#C5A059]">✦</span>
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onShare();
                }}
                className="flex-1 py-2 text-xs font-medium text-[#6E1A2D] bg-[#FCEEE9] rounded-lg border border-[#C5A059]/30 flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPrint();
                }}
                className="flex-1 py-2 text-xs font-medium text-[#6E1A2D] bg-[#FCEEE9] rounded-lg border border-[#C5A059]/30 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
