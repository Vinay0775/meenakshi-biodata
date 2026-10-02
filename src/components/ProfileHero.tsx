import React, { useState } from 'react';
import type { BiodataProfile } from '../types';
import { calculateAge, formatIndianDate } from '../data/initialData';
import { 
  Sparkles, 
  Eye, 
  Upload, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Ruler, 
  Download, 
  PhoneCall, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface ProfileHeroProps {
  data: BiodataProfile;
  onOpenLightbox: (src: string) => void;
  onDownloadPdf: () => void;
  onPhotoUpload: (file: File) => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  data,
  onOpenLightbox,
  onDownloadPdf,
  onPhotoUpload,
}) => {
  const [activePhoto, setActivePhoto] = useState<'primary' | 'secondary'>('primary');
  const currentPhotoUrl = activePhoto === 'primary' ? data.photos.primary : data.photos.secondary;
  const age = calculateAge(data.personal.dateOfBirth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoUpload(e.target.files[0]);
    }
  };

  return (
    <section id="hero" className="relative pt-6 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-mandala-pattern">
      {/* Decorative Gold Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#DFBE76]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#88243C]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Auspicious Vedic Invocation Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FDFBF7]/90 border border-[#C5A059]/40 shadow-sm backdrop-blur-sm">
          <span className="text-xs text-[#C5A059]">✦</span>
          <span className="font-devanagari text-sm sm:text-base text-[#88243C] font-semibold tracking-wide">
            || श्री गणेशाय नमः ||
          </span>
          <span className="text-xs text-[#C5A059]">✦</span>
        </div>
        <p className="text-[11px] sm:text-xs tracking-widest uppercase text-[#99742B] font-medium mt-1">
          Auspicious Matrimonial Biodata Invitation
        </p>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-5xl mx-auto bg-[#FDFBF7]/90 backdrop-blur-sm rounded-3xl border border-[#C5A059]/40 shadow-xl overflow-hidden p-6 sm:p-10 relative">
        {/* Rajasthani Ornamental Corner Flairs */}
        <div className="absolute top-2 left-2 text-[#C5A059]/40 select-none text-xl leading-none">❧</div>
        <div className="absolute top-2 right-2 text-[#C5A059]/40 select-none text-xl leading-none scale-x-[-1]">❧</div>
        <div className="absolute bottom-2 left-2 text-[#C5A059]/40 select-none text-xl leading-none scale-y-[-1]">❧</div>
        <div className="absolute bottom-2 right-2 text-[#C5A059]/40 select-none text-xl leading-none scale-[-1]">❧</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Portrait Photograph with Royal Rajasthani Jharokha Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* The Royal Jharokha Portrait Container */}
            <div className="relative group w-full max-w-[340px]">
              {/* Outer Golden Border & Shadow */}
              <div className="p-2 sm:p-2.5 rounded-t-[170px] rounded-b-2xl bg-gradient-to-b from-[#DFBE76] via-[#C5A059] to-[#88243C]/40 shadow-2xl relative">
                
                {/* Traditional Arch Crown Crest */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-[#FDFBF7] px-3 py-1 rounded-full border border-[#C5A059] shadow-sm flex items-center gap-1.5 text-[#88243C]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E1A2D]">Profile Portrait</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>

                {/* Inner Frame */}
                <div className="relative overflow-hidden rounded-t-[160px] rounded-b-xl bg-[#2D161C] aspect-[3/4] max-h-[460px]">
                  <img
                    src={currentPhotoUrl}
                    alt={data.personal.fullName}
                    className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: 'center 15%' }}
                  />

                  {/* Gentle gradient overlay at bottom for aesthetics */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D161C]/80 via-transparent to-transparent opacity-60" />

                  {/* Floating Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => onOpenLightbox(currentPhotoUrl)}
                      className="px-3.5 py-2 rounded-full bg-white/95 text-[#6E1A2D] text-xs font-semibold shadow-lg hover:bg-white flex items-center gap-1.5 transition-transform hover:scale-105"
                      title="View Full Resolution Photo"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Photo</span>
                    </button>
                  </div>

                  {/* Watermark / Identity Label */}
                  <div className="absolute bottom-3 left-0 right-0 text-center px-4">
                    <span className="text-xs font-serif text-[#F8F3E6] drop-shadow-md tracking-wider">
                      {data.personal.fullName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Photo Switcher & Upload Bar */}
              <div className="mt-4 flex items-center justify-between gap-2 w-full px-1">
                <div className="flex items-center gap-1.5 bg-[#FAF6F0] p-1 rounded-full border border-[#C5A059]/40 shadow-xs">
                  <button
                    onClick={() => setActivePhoto('primary')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activePhoto === 'primary'
                        ? 'bg-[#88243C] text-white shadow-xs'
                        : 'text-[#6E1A2D] hover:bg-[#FCEEE9]'
                    }`}
                  >
                    Portrait
                  </button>
                  <button
                    onClick={() => setActivePhoto('secondary')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activePhoto === 'secondary'
                        ? 'bg-[#88243C] text-white shadow-xs'
                        : 'text-[#6E1A2D] hover:bg-[#FCEEE9]'
                    }`}
                  >
                    Traditional
                  </button>
                </div>

                {/* Upload custom photo button */}
                <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#6E1A2D] bg-[#FCEEE9] hover:bg-[#F7D6D0] border border-[#C5A059]/40 transition-colors">
                  <Upload className="w-3 h-3 text-[#88243C]" />
                  <span>Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Title, Royal Details & Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Tagline / Subtitle */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#C5A059]" />
              <span className="font-royal text-xs uppercase tracking-[0.2em] text-[#99742B] font-semibold">
                Marriage Biodata
              </span>
              <span className="h-0.5 w-6 bg-[#C5A059]" />
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#6E1A2D] tracking-wide my-1 leading-tight">
              {data.personal.fullName}
            </h1>

            {/* Respectful Tag */}
            <p className="text-xs sm:text-sm font-classic italic text-[#805C1B] font-medium mb-3">
              "A beautiful journey begins with a meaningful connection."
            </p>

            {/* Ornamental Flourish */}
            <div className="flex items-center justify-center lg:justify-start my-1 text-[#C5A059]">
              <span className="text-xs">✦</span>
              <div className="h-[1px] w-20 bg-[#C5A059]/40 mx-2" />
              <span className="text-sm">🪷</span>
              <div className="h-[1px] w-20 bg-[#C5A059]/40 mx-2" />
              <span className="text-xs">✦</span>
            </div>

            {/* Academic & Professional Spotlight Badge */}
            <div className="mt-3 mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-[#FCEEE9] via-[#FAF6F0] to-[#FDFBF7] border border-[#C5A059]/40 shadow-xs text-left">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#88243C] text-[#F3E5AB] flex items-center justify-center shrink-0 shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#88243C] text-white text-[11px] font-semibold tracking-wide">
                      UGC NET QUALIFIED
                    </span>
                    <span className="text-xs font-semibold text-[#6E1A2D]">
                      Post Graduation (M.Com)
                    </span>
                  </div>
                  <p className="text-xs text-[#523F42] mt-1 leading-relaxed">
                    Aspiring Assistant Professor in Commerce & Higher Education. Qualified with distinguished academic credentials.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Information Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 text-left">
              {/* Caste / Community */}
              <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#DFBE76]/20 text-[#99742B] flex items-center justify-center shrink-0 text-sm">
                  🕉️
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#735E62] block font-medium">Community</span>
                  <span className="text-xs font-semibold text-[#2D2224]">{data.personal.religion} • {data.personal.caste}</span>
                </div>
              </div>

              {/* DOB & Age */}
              <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#DFBE76]/20 text-[#88243C] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#735E62] block font-medium">DOB & Age</span>
                  <span className="text-xs font-semibold text-[#2D2224]">{formatIndianDate(data.personal.dateOfBirth)} ({age} Yrs)</span>
                </div>
              </div>

              {/* Height */}
              <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#DFBE76]/20 text-[#88243C] flex items-center justify-center shrink-0">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#735E62] block font-medium">Height</span>
                  <span className="text-xs font-semibold text-[#2D2224]">{data.personal.height}</span>
                </div>
              </div>

              {/* Complexion */}
              <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#DFBE76]/20 text-[#88243C] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#735E62] block font-medium">Complexion</span>
                  <span className="text-xs font-semibold text-[#2D2224]">{data.personal.complexion}</span>
                </div>
              </div>

              {/* Gotra */}
              <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#DFBE76]/20 text-[#88243C] flex items-center justify-center shrink-0 text-sm">
                  👑
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#735E62] block font-medium">Self Gotra</span>
                  <span className="text-xs font-semibold text-[#2D2224]">{data.gotra.self}</span>
                </div>
              </div>

              {/* Native / Location */}
              <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#DFBE76]/20 text-[#88243C] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#735E62] block font-medium">Location</span>
                  <span className="text-xs font-semibold text-[#2D2224]">{data.personal.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#personal"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#88243C] text-white text-xs sm:text-sm font-semibold hover:bg-[#6E1A2D] shadow-md hover:shadow-lg transition-all"
              >
                <span>View Full Details</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FAF6F0] text-[#6E1A2D] text-xs sm:text-sm font-semibold border border-[#C5A059] hover:bg-[#FCEEE9] shadow-xs transition-all"
              >
                <Download className="w-4 h-4 text-[#C5A059]" />
                <span>Download Biodata (PDF)</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAF6F0] text-[#6E1A2D] text-xs sm:text-sm font-semibold border border-[#C5A059]/40 hover:bg-[#FCEEE9] transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#88243C]" />
                <span>Contact Parents</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
