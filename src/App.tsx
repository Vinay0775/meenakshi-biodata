import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { BiodataProfile } from './types';
import { initialBiodata } from './data/initialData';
import { Navbar } from './components/Navbar';
import { ProfileHero } from './components/ProfileHero';
import { PersonalDetails } from './components/PersonalDetails';
import { EducationCareer } from './components/EducationCareer';
import { FamilyBackground } from './components/FamilyBackground';
import { GotraDetails } from './components/GotraDetails';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { PhotoLightbox } from './components/PhotoLightbox';
import { BiodataPDF } from './components/BiodataPDF';
import { exportBiodataToPdf } from './utils/pdfExport';
import { ambientAudio } from './utils/audio';
import { Loader2, Sparkles, X } from 'lucide-react';

const STORAGE_KEY = 'meenakshi_matrimonial_profile_v1';

export const App: React.FC = () => {
  const [profileData, setProfileData] = useState<BiodataProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return initialBiodata;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = (updatedData: BiodataProfile) => {
    setProfileData(updatedData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (e) {}
    showToast('Biodata details updated successfully!');
  };

  const handleResetProfile = () => {
    setProfileData(initialBiodata);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    showToast('Profile reset to original biodata values.');
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const updated = {
          ...profileData,
          photos: {
            ...profileData.photos,
            primary: result,
          },
        };
        handleSaveProfile(updated);
        showToast('Profile photograph updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleAudio = () => {
    const newState = ambientAudio.toggle();
    setIsAudioPlaying(newState);
    showToast(newState ? 'Playing traditional ambient music' : 'Ambient music muted');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Meenakshi Kumawat — Marriage Biodata',
      text: 'Matrimonial Profile of Meenakshi Kumawat (M.Com, NET Qualified). Personal, education, family and gotra details.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Shared successfully!');
      } catch (err) {
        // User cancelled or fallback
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    showToast('Preparing elegant A4 Marriage Biodata PDF...');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#DFBE76', '#C5A059', '#88243C', '#FCEEE9'],
      });

      await exportBiodataToPdf(
        'printable-biodata',
        `${profileData.personal.fullName.replace(/\s+/g, '_')}_Marriage_Biodata.pdf`
      );
      showToast('Biodata PDF downloaded successfully!');
    } catch (e) {
      showToast('Downloaded via print layout.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2D2224] flex flex-col font-sans selection:bg-[#88243C] selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FDFBF7] text-[#6E1A2D] px-4 py-3 rounded-2xl border border-[#C5A059] shadow-2xl flex items-center gap-3 animate-bounce no-print">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#7A676A] hover:text-[#2D2224]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* PDF Generation Overlay */}
      {isGeneratingPdf && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#C5A059] shadow-2xl text-center max-w-sm">
            <Loader2 className="w-8 h-8 text-[#88243C] animate-spin mx-auto mb-3" />
            <h3 className="font-serif font-bold text-base text-[#6E1A2D]">
              Generating Marriage Biodata PDF
            </h3>
            <p className="text-xs text-[#7A676A] mt-1">
              Formatting royal A4 portrait page with ornamental borders and photographs...
            </p>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar
        onOpenEdit={() => setIsEditorOpen(true)}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        onShare={handleShare}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={handleToggleAudio}
      />

      {/* Main Sections */}
      <main className="flex-1 w-full max-w-[1100px] mx-auto">
        <ProfileHero
          data={profileData}
          onOpenLightbox={(src) => setLightboxPhoto(src)}
          onDownloadPdf={handleDownloadPdf}
          onPhotoUpload={handlePhotoUpload}
        />

        <PersonalDetails data={profileData} />

        <EducationCareer data={profileData} />

        <FamilyBackground data={profileData} />

        <GotraDetails
          data={profileData}
          onOpenEdit={() => setIsEditorOpen(true)}
        />

        <ContactSection data={profileData} />
      </main>

      {/* Footer */}
      <Footer
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        onShare={handleShare}
      />

      {/* Lightbox for Photographs */}
      <PhotoLightbox
        isOpen={!!lightboxPhoto}
        photoUrl={lightboxPhoto}
        title={`${profileData.personal.fullName} — Portrait`}
        onClose={() => setLightboxPhoto(null)}
      />

      {/* Profile Live Editor Modal */}
      <ProfileEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={profileData}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
        onPhotoUpload={handlePhotoUpload}
      />

      {/* Hidden Offscreen Print & Export Container for Pixel-Perfect PDF generation */}
      <div className="fixed -left-[9999px] top-0 opacity-0 pointer-events-none print:opacity-100 print:static print:pointer-events-auto">
        <BiodataPDF data={profileData} />
      </div>

    </div>
  );
};

export default App;
