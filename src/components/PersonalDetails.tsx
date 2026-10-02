import React from 'react';
import type { BiodataProfile } from '../types';
import { calculateAge, formatIndianDate } from '../data/initialData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { 
  User, 
  Calendar, 
  Ruler, 
  Sparkles, 
  Heart, 
  Languages, 
  Utensils, 
  MapPin, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface PersonalDetailsProps {
  data: BiodataProfile;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data }) => {
  const age = calculateAge(data.personal.dateOfBirth);

  const detailItems = [
    {
      label: 'Full Name',
      value: data.personal.fullName,
      icon: <User className="w-4 h-4 text-[#88243C]" />,
      highlight: true,
    },
    {
      label: 'Religion',
      value: data.personal.religion,
      icon: <span className="text-sm">🕉️</span>,
    },
    {
      label: 'Caste / Community',
      value: data.personal.caste,
      icon: <ShieldCheck className="w-4 h-4 text-[#88243C]" />,
    },
    {
      label: 'Date of Birth',
      value: `${formatIndianDate(data.personal.dateOfBirth)} (${data.personal.dateOfBirth})`,
      icon: <Calendar className="w-4 h-4 text-[#88243C]" />,
    },
    {
      label: 'Age',
      value: `${age} Years`,
      icon: <Sparkles className="w-4 h-4 text-[#C5A059]" />,
      highlight: true,
    },
    {
      label: 'Height',
      value: data.personal.height,
      icon: <Ruler className="w-4 h-4 text-[#88243C]" />,
    },
    {
      label: 'Complexion',
      value: data.personal.complexion,
      icon: <Sparkles className="w-4 h-4 text-[#88243C]" />,
    },
    {
      label: 'Marital Status',
      value: data.personal.maritalStatus,
      icon: <Heart className="w-4 h-4 text-[#88243C]" />,
    },
    {
      label: 'Mother Tongue',
      value: data.personal.motherTongue,
      icon: <Languages className="w-4 h-4 text-[#88243C]" />,
    },
    {
      label: 'Dietary Habits',
      value: data.personal.diet,
      icon: <Utensils className="w-4 h-4 text-[#88243C]" />,
    },
    {
      label: 'Current Residence',
      value: data.personal.location,
      icon: <MapPin className="w-4 h-4 text-[#88243C]" />,
    },
    ...(data.personal.bloodGroup
      ? [
          {
            label: 'Blood Group',
            value: data.personal.bloodGroup,
            icon: <Award className="w-4 h-4 text-[#88243C]" />,
          },
        ]
      : []),
  ];

  return (
    <section id="personal" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-royal uppercase tracking-widest text-[#99742B]">
          <span>✦</span>
          <span>Attributes & Background</span>
          <span>✦</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6E1A2D] mt-1">
          Personal Details
        </h2>
        <OrnamentalDivider />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#5C4B4E]">
          Comprehensive personal and astrological details as extracted from the authentic marriage biodata.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-[#FDFBF7] rounded-3xl border border-[#C5A059]/40 shadow-lg p-6 sm:p-10 relative overflow-hidden royal-card-shadow">
        {/* Subtle Ornamental Corner motif */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#DFBE76]/10 to-transparent pointer-events-none rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#88243C]/5 to-transparent pointer-events-none rounded-tr-full" />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
          {detailItems.map((item, index) => (
            <div
              key={index}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                item.highlight
                  ? 'bg-gradient-to-r from-[#FCEEE9] to-[#FAF6F0] border-[#C5A059]/50 shadow-xs'
                  : 'bg-[#FAF6F0]/80 border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:bg-[#FAF6F0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FDFBF7] border border-[#C5A059]/30 flex items-center justify-center shrink-0 shadow-2xs">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7A676A] font-medium block">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#2D2224]">
                    {item.value}
                  </span>
                </div>
              </div>
              <span className="text-[#C5A059]/40 text-xs">✦</span>
            </div>
          ))}
        </div>

        {/* Hobbies / Interests Pill Tags */}
        {data.personal.hobbies && data.personal.hobbies.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#6E1A2D]">
              Interests & Lifestyle:
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {data.personal.hobbies.map((hobby, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF6F0] text-[#6E1A2D] border border-[#C5A059]/30"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
