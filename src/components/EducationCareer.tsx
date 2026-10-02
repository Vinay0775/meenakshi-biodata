import React from 'react';
import type { BiodataProfile } from '../types';
import { OrnamentalDivider } from './OrnamentalDivider';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Building2,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface EducationCareerProps {
  data: BiodataProfile;
}

export const EducationCareer: React.FC<EducationCareerProps> = ({ data }) => {
  return (
    <section id="education" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-royal uppercase tracking-widest text-[#99742B]">
          <span>✦</span>
          <span>Academic & Professional Credentials</span>
          <span>✦</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6E1A2D] mt-1">
          Education & Career
        </h2>
        <OrnamentalDivider />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#5C4B4E]">
          Distinguished academic qualifications and committed professional trajectory in collegiate education and commerce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Education Card */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-[#C5A059]/40 p-6 sm:p-8 shadow-lg royal-card-shadow relative overflow-hidden royal-hover-lift">
          {/* Top Decorative Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#C5A059]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#88243C] text-[#F3E5AB] flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#99742B] block">
                  Higher Education
                </span>
                <h3 className="text-lg font-serif font-bold text-[#6E1A2D]">
                  Post Graduation
                </h3>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FCEEE9] text-[#88243C] border border-[#C5A059]/30">
              M.Com
            </span>
          </div>

          {/* Education Details Content */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/20">
              <span className="text-[11px] uppercase tracking-wider text-[#7A676A] block font-medium">
                Degree Obtained
              </span>
              <p className="text-base font-bold text-[#2D2224] mt-0.5">
                {data.educationCareer.education}
              </p>
              <p className="text-xs text-[#523F42] mt-1">
                {data.educationCareer.educationDetails}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/20">
              <span className="text-[11px] uppercase tracking-wider text-[#7A676A] block font-medium">
                Academic Specialization
              </span>
              <p className="text-sm font-semibold text-[#2D2224] mt-0.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#88243C]" />
                {data.educationCareer.specialization}
              </p>
            </div>

            {data.educationCareer.additionalCertifications && (
              <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/20">
                <span className="text-[11px] uppercase tracking-wider text-[#7A676A] block font-medium">
                  Additional Academic Merit
                </span>
                <p className="text-xs font-medium text-[#4A3B3E] mt-0.5">
                  {data.educationCareer.additionalCertifications}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Career & NET Qualification Card */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-[#C5A059]/40 p-6 sm:p-8 shadow-lg royal-card-shadow relative overflow-hidden royal-hover-lift">
          {/* Top Decorative Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#C5A059]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DFBE76] to-[#C5A059] text-[#4A0E1C] flex items-center justify-center shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#99742B] block">
                  Professional Qualification
                </span>
                <h3 className="text-lg font-serif font-bold text-[#6E1A2D]">
                  Career & Accomplishments
                </h3>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#88243C] text-white shadow-xs">
              UGC NET
            </span>
          </div>

          {/* Career Content */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FCEEE9] to-[#FAF6F0] border border-[#C5A059]/40">
              <span className="text-[11px] uppercase tracking-wider text-[#88243C] block font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                National Eligibility Test (NET) Qualified
              </span>
              <p className="text-base font-bold text-[#2D2224] mt-0.5">
                {data.educationCareer.occupation}
              </p>
              <p className="text-xs text-[#523F42] mt-1 leading-relaxed">
                {data.educationCareer.occupationDetails}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/20">
              <span className="text-[11px] uppercase tracking-wider text-[#7A676A] block font-medium">
                Professional Vision
              </span>
              <p className="text-xs text-[#4A3B3E] mt-0.5 leading-relaxed flex items-start gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#88243C] shrink-0 mt-0.5" />
                {data.educationCareer.careerGoal}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/20">
              <span className="text-[11px] uppercase tracking-wider text-[#7A676A] block font-medium">
                Career Sector
              </span>
              <p className="text-sm font-semibold text-[#2D2224] mt-0.5 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#88243C]" />
                Collegiate Education & University Commerce Faculty
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
