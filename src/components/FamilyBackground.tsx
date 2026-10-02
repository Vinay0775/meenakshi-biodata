import React from 'react';
import type { BiodataProfile } from '../types';
import { OrnamentalDivider } from './OrnamentalDivider';
import { 
  Users, 
  Palette, 
  Home, 
  Crown, 
  HeartHandshake, 
  GitBranch
} from 'lucide-react';

interface FamilyBackgroundProps {
  data: BiodataProfile;
}

export const FamilyBackground: React.FC<FamilyBackgroundProps> = ({ data }) => {
  return (
    <section id="family" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-royal uppercase tracking-widest text-[#99742B]">
          <span>✦</span>
          <span>Ancestry & Kinship</span>
          <span>✦</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6E1A2D] mt-1">
          Family Background
        </h2>
        <OrnamentalDivider />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#5C4B4E]">
          A respected and close-knit family rooted in rich artistic heritage, moral values, and traditional Rajasthani culture.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Tier 1: Grandparents & Ancestral Roots */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-[#C5A059]/40 p-6 sm:p-8 shadow-lg royal-card-shadow relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-[#88243C]">
            <Crown className="w-4 h-4 text-[#C5A059]" />
            <h3 className="text-sm uppercase tracking-widest font-bold text-[#99742B]">
              Grandparents (Paternal)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/25 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#DFBE76]/20 text-[#88243C] flex items-center justify-center shrink-0 text-base">
                👴
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A676A] font-medium block">
                  Grandfather
                </span>
                <span className="text-base font-serif font-bold text-[#2D2224]">
                  {data.family.grandfather}
                </span>
                <span className="text-xs text-[#7A676A] block mt-0.5">
                  Kumawat Family Patriarch
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/25 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#DFBE76]/20 text-[#88243C] flex items-center justify-center shrink-0 text-base">
                👵
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A676A] font-medium block">
                  Grandmother
                </span>
                <span className="text-base font-serif font-bold text-[#2D2224]">
                  {data.family.grandmother}
                </span>
                <span className="text-xs text-[#7A676A] block mt-0.5">
                  Matriarch of the Family
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Parents (Father & Mother) */}
        <div className="bg-gradient-to-r from-[#FCEEE9] via-[#FAF6F0] to-[#FDFBF7] rounded-3xl border border-[#C5A059]/50 p-6 sm:p-8 shadow-lg royal-card-shadow relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-[#88243C]">
            <HeartHandshake className="w-4 h-4 text-[#88243C]" />
            <h3 className="text-sm uppercase tracking-widest font-bold text-[#88243C]">
              Parents
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Father */}
            <div className="p-4 rounded-2xl bg-white/80 border border-[#C5A059]/30 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#88243C] text-[#F3E5AB] flex items-center justify-center shrink-0 shadow-xs">
                <Palette className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-wider text-[#7A676A] font-medium block">
                  Father
                </span>
                <span className="text-base font-serif font-bold text-[#6E1A2D] block">
                  {data.family.fatherName}
                </span>
                <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF6F0] text-xs font-semibold text-[#88243C] border border-[#C5A059]/30">
                  <Palette className="w-3 h-3 text-[#C5A059]" />
                  <span>{data.family.fatherOccupation}</span>
                </div>
                <p className="text-xs text-[#523F42] mt-1.5 leading-relaxed">
                  Celebrated Artist specializing in traditional Rajasthani miniature painting techniques.
                </p>
              </div>
            </div>

            {/* Mother */}
            <div className="p-4 rounded-2xl bg-white/80 border border-[#C5A059]/30 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#DFBE76] text-[#4A0E1C] flex items-center justify-center shrink-0 shadow-xs">
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-wider text-[#7A676A] font-medium block">
                  Mother
                </span>
                <span className="text-base font-serif font-bold text-[#6E1A2D] block">
                  {data.family.motherName}
                </span>
                <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF6F0] text-xs font-semibold text-[#88243C] border border-[#C5A059]/30">
                  <Home className="w-3 h-3 text-[#C5A059]" />
                  <span>{data.family.motherOccupation}</span>
                </div>
                <p className="text-xs text-[#523F42] mt-1.5 leading-relaxed">
                  The devoted soul of the household, upholding family culture, harmony, and traditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: Siblings & Extended Family */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Siblings */}
          <div className="bg-[#FDFBF7] rounded-3xl border border-[#C5A059]/40 p-6 sm:p-7 shadow-lg royal-card-shadow">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C5A059]/20">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#88243C]" />
                <h3 className="text-sm uppercase tracking-widest font-bold text-[#99742B]">
                  Siblings ({data.family.totalSiblings})
                </h3>
              </div>
              <span className="text-xs text-[#7A676A] font-medium">Brothers & Sisters</span>
            </div>

            <div className="space-y-3">
              {/* Brother */}
              <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/25 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A676A] font-medium block">
                    Brother
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {data.family.brotherNames.map((name, i) => (
                      <span key={i} className="text-sm font-semibold text-[#2D2224]">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#FCEEE9] text-[11px] font-medium text-[#88243C]">
                  Brother
                </span>
              </div>

              {/* Sisters */}
              <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/25 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A676A] font-medium block">
                    Sisters
                  </span>
                  <div className="flex flex-wrap gap-2 mt-0.5">
                    {data.family.sisterNames.map((name, i) => (
                      <span key={i} className="text-sm font-semibold text-[#2D2224]">
                        {name}{i < data.family.sisterNames.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#FCEEE9] text-[11px] font-medium text-[#88243C]">
                  2 Sisters
                </span>
              </div>
            </div>
          </div>

          {/* Paternal Uncles & Aunts (Chacha / Tauji) */}
          <div className="bg-[#FDFBF7] rounded-3xl border border-[#C5A059]/40 p-6 sm:p-7 shadow-lg royal-card-shadow">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C5A059]/20">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#88243C]" />
                <h3 className="text-sm uppercase tracking-widest font-bold text-[#99742B]">
                  Paternal Uncles (चाचा / ताऊजी)
                </h3>
              </div>
              <span className="text-xs text-[#7A676A] font-medium">Extended Family</span>
            </div>

            <div className="space-y-2.5">
              {data.family.paternalUncles.map((uncle, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/25 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                    <span className="text-sm font-semibold text-[#2D2224]">
                      {uncle}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#7A676A] font-medium">Paternal Uncle</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#C5A059]/15 flex items-center justify-between text-xs text-[#7A676A]">
              <span>Native Heritage:</span>
              <span className="font-semibold text-[#6E1A2D]">{data.family.nativePlace}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
