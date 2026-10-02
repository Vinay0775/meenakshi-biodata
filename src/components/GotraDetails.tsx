import React from 'react';
import type { BiodataProfile } from '../types';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Shield, Info } from 'lucide-react';

interface GotraDetailsProps {
  data: BiodataProfile;
  onOpenEdit: () => void;
}

export const GotraDetails: React.FC<GotraDetailsProps> = ({ data, onOpenEdit }) => {
  const gotraItems = [
    {
      relationship: "Self Gotra (Pita / Father)",
      hindi: 'स्वयं / पिता का गोत्र',
      gotra: data.gotra.self,
      description: 'Paternal lineage inherited through father Shri Omprakash Kumawat',
      badge: 'Paternal Primary',
      primary: true,
    },
    {
      relationship: "Mama's Gotra (Maternal Uncle)",
      hindi: 'मामा / ननिहाल का गोत्र',
      gotra: data.gotra.mama,
      description: 'Maternal uncle lineage through mother Smt. Mansha Devi',
      badge: 'Maternal Lineage',
    },
    {
      relationship: "Dadi's Gotra (Paternal Grandmother)",
      hindi: 'दादी का गोत्र',
      gotra: data.gotra.dadi,
      description: 'Paternal grandmother lineage through Smt. Manfuli Devi',
      badge: 'Grandmother Paternal',
    },
    {
      relationship: "Nani's Gotra (Maternal Grandmother)",
      hindi: 'नानी का गोत्र',
      gotra: data.gotra.nani,
      description: 'Maternal grandmother lineage through maternal family heritage',
      badge: 'Grandmother Maternal',
    },
  ];

  return (
    <section id="gotra" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-royal uppercase tracking-widest text-[#99742B]">
          <span>✦</span>
          <span>Sacred Ancestral Lineage</span>
          <span>✦</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6E1A2D] mt-1">
          Family Heritage & Gotra
        </h2>
        <OrnamentalDivider />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#5C4B4E]">
          As per traditional Rajasthani and Vedic customs, the four primary gotras are honored for ancestral harmony and matrimonial alliance.
        </p>
      </div>

      {/* 4 Gotra Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {gotraItems.map((item, index) => (
          <div
            key={index}
            className={`rounded-3xl border transition-all duration-300 p-5 sm:p-6 text-center relative overflow-hidden royal-hover-lift flex flex-col justify-between ${
              item.primary
                ? 'bg-gradient-to-b from-[#FCEEE9] via-[#FAF6F0] to-[#FDFBF7] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30'
                : 'bg-[#FDFBF7] border-[#C5A059]/40 shadow-sm hover:border-[#C5A059]'
            }`}
          >
            {/* Top Ornamental Badge */}
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DFBE76] to-[#C5A059] text-[#4A0E1C] mx-auto shadow-sm mb-3">
                <Shield className="w-6 h-6 fill-[#DFBE76]/30" />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-[#99742B] block mb-1">
                {item.badge}
              </span>

              <h3 className="text-xs sm:text-sm font-semibold text-[#523F42] leading-tight">
                {item.relationship}
              </h3>

              <div className="my-3 py-2 px-3 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/30">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#6E1A2D] block tracking-wide">
                  {item.gotra}
                </span>
                <span className="text-[11px] text-[#7A676A] font-medium block mt-0.5">
                  {item.hindi}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#735E62] leading-relaxed mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Gotra verification & edit callout */}
      <div className="mt-8 p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#523F42]">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-[#88243C] shrink-0" />
          <span>
            <strong>Note on Gotras:</strong> Traditional Kumawat community practices observing 4-gotra parihar. All gotra spellings may be verified or modified directly anytime.
          </span>
        </div>
        <button
          onClick={onOpenEdit}
          className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#FDFBF7] text-[#88243C] border border-[#C5A059] hover:bg-[#88243C] hover:text-white font-medium text-xs transition-colors shadow-2xs"
        >
          Verify / Edit Gotras
        </button>
      </div>
    </section>
  );
};
