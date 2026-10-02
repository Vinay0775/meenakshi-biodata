import React from 'react';
import type { BiodataProfile } from '../types';
import { calculateAge, formatIndianDate } from '../data/initialData';

interface BiodataPDFProps {
  data: BiodataProfile;
}

export const BiodataPDF: React.FC<BiodataPDFProps> = ({ data }) => {
  const age = calculateAge(data.personal.dateOfBirth);

  return (
    <div
      id="printable-biodata"
      className="bg-white text-[#2C1E21] mx-auto p-8 sm:p-10 border-[10px] border-[#DFBE76] shadow-2xl relative"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      {/* Decorative Gold Filigree Inner Border */}
      <div className="border-2 border-[#88243C] p-6 relative h-full flex flex-col justify-between">
        
        {/* Corner Ornaments */}
        <div className="absolute -top-3 -left-3 text-[#C5A059] text-xl font-serif">✤</div>
        <div className="absolute -top-3 -right-3 text-[#C5A059] text-xl font-serif">✤</div>
        <div className="absolute -bottom-3 -left-3 text-[#C5A059] text-xl font-serif">✤</div>
        <div className="absolute -bottom-3 -right-3 text-[#C5A059] text-xl font-serif">✤</div>

        <div>
          {/* Header Shloka */}
          <div className="text-center mb-4">
            <span className="text-xs text-[#88243C] tracking-widest font-semibold block">
              || श्री गणेशाय नमः ||
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#6E1A2D] uppercase tracking-wider mt-1">
              {data.personal.fullName}
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#99742B] font-semibold">
              Marriage Biodata
            </p>
            <div className="flex items-center justify-center my-2">
              <div className="h-[1px] w-24 bg-[#C5A059]" />
              <span className="mx-2 text-[#C5A059] text-xs">🪷</span>
              <div className="h-[1px] w-24 bg-[#C5A059]" />
            </div>
          </div>

          {/* Top Row: Photo + Primary Overview */}
          <div className="flex items-center gap-6 pb-4 mb-4 border-b border-[#C5A059]/40">
            {/* Portrait Photo */}
            <div className="w-36 h-48 shrink-0 rounded-t-[70px] rounded-b-lg border-2 border-[#C5A059] p-1 bg-[#FAF6F0] overflow-hidden shadow-sm">
              <img
                src={data.photos.primary}
                alt={data.personal.fullName}
                className="w-full h-full object-cover rounded-t-[65px] rounded-b-md"
                style={{ objectPosition: 'center 15%' }}
              />
            </div>

            {/* Quick Summary Table */}
            <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <span className="text-[#7A676A] block text-[10px] uppercase font-semibold">Date of Birth</span>
                <span className="font-bold text-[#2D2224]">{formatIndianDate(data.personal.dateOfBirth)}</span>
              </div>

              <div>
                <span className="text-[#7A676A] block text-[10px] uppercase font-semibold">Age & Height</span>
                <span className="font-bold text-[#2D2224]">{age} Years, {data.personal.height}</span>
              </div>

              <div>
                <span className="text-[#7A676A] block text-[10px] uppercase font-semibold">Religion & Caste</span>
                <span className="font-bold text-[#2D2224]">{data.personal.religion} — {data.personal.caste}</span>
              </div>

              <div>
                <span className="text-[#7A676A] block text-[10px] uppercase font-semibold">Complexion</span>
                <span className="font-bold text-[#2D2224]">{data.personal.complexion}</span>
              </div>

              <div>
                <span className="text-[#7A676A] block text-[10px] uppercase font-semibold">Marital Status</span>
                <span className="font-bold text-[#2D2224]">{data.personal.maritalStatus}</span>
              </div>

              <div>
                <span className="text-[#7A676A] block text-[10px] uppercase font-semibold">Mother Tongue</span>
                <span className="font-bold text-[#2D2224]">{data.personal.motherTongue}</span>
              </div>
            </div>
          </div>

          {/* Education & Career Block */}
          <div className="mb-4 pb-3 border-b border-[#C5A059]/40">
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#88243C] mb-2 flex items-center gap-1.5">
              <span>✦</span> Education & Career Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs bg-[#FAF6F0] p-3 rounded-lg border border-[#C5A059]/30">
              <div>
                <span className="text-[#7A676A] block text-[10px] uppercase font-semibold">Highest Education</span>
                <span className="font-bold text-[#2D2224]">{data.educationCareer.education}</span>
                <span className="text-[11px] text-[#5C4B4E] block">{data.educationCareer.educationDetails}</span>
              </div>
              <div>
                <span className="text-[#7A676A] block text-[10px] uppercase font-semibold">Occupation & Qualification</span>
                <span className="font-bold text-[#88243C] block">{data.educationCareer.occupation}</span>
                <span className="text-[11px] text-[#5C4B4E] block">{data.educationCareer.specialization}</span>
              </div>
            </div>
          </div>

          {/* Family Background Block */}
          <div className="mb-4 pb-3 border-b border-[#C5A059]/40">
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#88243C] mb-2 flex items-center gap-1.5">
              <span>✦</span> Family Details
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <span className="text-[#7A676A] text-[10px] uppercase font-semibold block">Grandfather</span>
                <span className="font-bold text-[#2D2224]">{data.family.grandfather}</span>
              </div>
              <div>
                <span className="text-[#7A676A] text-[10px] uppercase font-semibold block">Grandmother</span>
                <span className="font-bold text-[#2D2224]">{data.family.grandmother}</span>
              </div>
              <div>
                <span className="text-[#7A676A] text-[10px] uppercase font-semibold block">Father's Name & Occupation</span>
                <span className="font-bold text-[#2D2224]">{data.family.fatherName}</span>
                <span className="text-[11px] text-[#5C4B4E] block">({data.family.fatherOccupation})</span>
              </div>
              <div>
                <span className="text-[#7A676A] text-[10px] uppercase font-semibold block">Mother's Name & Occupation</span>
                <span className="font-bold text-[#2D2224]">{data.family.motherName}</span>
                <span className="text-[11px] text-[#5C4B4E] block">({data.family.motherOccupation})</span>
              </div>
              <div>
                <span className="text-[#7A676A] text-[10px] uppercase font-semibold block">Brothers</span>
                <span className="font-bold text-[#2D2224]">{data.family.brotherNames.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#7A676A] text-[10px] uppercase font-semibold block">Sisters</span>
                <span className="font-bold text-[#2D2224]">{data.family.sisterNames.join(', ')}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#7A676A] text-[10px] uppercase font-semibold block">Paternal Uncles (Chacha / Tauji)</span>
                <span className="font-bold text-[#2D2224]">{data.family.paternalUncles.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Gotra Block */}
          <div className="mb-4 pb-3 border-b border-[#C5A059]/40">
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#88243C] mb-2 flex items-center gap-1.5">
              <span>✦</span> Gotra Heritage (4-Gotra System)
            </h2>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-[#FAF6F0] rounded border border-[#C5A059]/30">
                <span className="text-[9px] uppercase font-semibold text-[#7A676A] block">Self (Father)</span>
                <span className="font-bold text-sm text-[#88243C]">{data.gotra.self}</span>
              </div>
              <div className="p-2 bg-[#FAF6F0] rounded border border-[#C5A059]/30">
                <span className="text-[9px] uppercase font-semibold text-[#7A676A] block">Mama (Maternal)</span>
                <span className="font-bold text-sm text-[#88243C]">{data.gotra.mama}</span>
              </div>
              <div className="p-2 bg-[#FAF6F0] rounded border border-[#C5A059]/30">
                <span className="text-[9px] uppercase font-semibold text-[#7A676A] block">Dadi</span>
                <span className="font-bold text-sm text-[#88243C]">{data.gotra.dadi}</span>
              </div>
              <div className="p-2 bg-[#FAF6F0] rounded border border-[#C5A059]/30">
                <span className="text-[9px] uppercase font-semibold text-[#7A676A] block">Nani</span>
                <span className="font-bold text-sm text-[#88243C]">{data.gotra.nani}</span>
              </div>
            </div>
          </div>

          {/* Contact Details (if enabled) */}
          {data.contact.isContactSectionEnabled && (
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-[#88243C] mb-2 flex items-center gap-1.5">
                <span>✦</span> Contact Information
              </h2>
              <div className="flex items-center justify-between text-xs bg-[#FAF6F0] p-3 rounded-lg border border-[#C5A059]/30">
                <div>
                  <span className="text-[10px] text-[#7A676A] uppercase font-semibold block">Contact Person</span>
                  <span className="font-bold text-[#2D2224]">{data.contact.contactPerson}</span>
                  <span className="text-[11px] text-[#7A676A] block">{data.contact.residenceCity}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#7A676A] uppercase font-semibold block">Phone Number</span>
                  <span className="font-bold text-sm text-[#6E1A2D] tracking-wide">+91 {data.contact.phoneNumber}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Blessing */}
        <div className="text-center pt-3 border-t border-[#C5A059]/30 text-[10px] text-[#7A676A]">
          <span>माङ्गल्यं तन्तुनानेन लोकभव्येन धार्यते • Kumawat Family Matrimonial Profile</span>
        </div>

      </div>
    </div>
  );
};
