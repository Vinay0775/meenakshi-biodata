import React, { useState } from 'react';
import type { BiodataProfile } from '../types';
import { OrnamentalDivider } from './OrnamentalDivider';
import { 
  Eye, 
  EyeOff, 
  MessageCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  MapPin, 
  User, 
  AlertCircle,
  PhoneCall
} from 'lucide-react';

interface ContactSectionProps {
  data: BiodataProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  data,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  // If user has disabled contact section entirely, return null or a polite placeholder
  if (!data.contact.isContactSectionEnabled) {
    return (
      <section id="contact" className="py-8 px-4 text-center">
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 text-xs text-[#7A676A]">
          <span>Contact details are currently set to private by the family.</span>
        </div>
      </section>
    );
  }

  const rawPhone = data.contact.phoneNumber.replace(/\D/g, '');
  const formattedFullPhone = `+91 ${data.contact.phoneNumber}`;
  const maskedPhone = `+91 ${data.contact.phoneNumber.slice(0, 5)} •••••`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`+91${rawPhone}`);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste, we viewed the matrimonial biodata profile of Meenakshi Kumawat and would like to respectfully connect with the family.`
  );

  return (
    <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-royal uppercase tracking-widest text-[#99742B]">
          <span>✦</span>
          <span>Respectful Inquiries</span>
          <span>✦</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6E1A2D] mt-1">
          Contact Information
        </h2>
        <OrnamentalDivider />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#5C4B4E]">
          Genuine matrimonial inquiries from families are warmly welcomed. Contact numbers are masked for privacy.
        </p>
      </div>

      {/* Main Privacy Card */}
      <div className="bg-[#FDFBF7] rounded-3xl border border-[#C5A059]/50 p-6 sm:p-10 shadow-xl royal-card-shadow relative overflow-hidden">
        {/* Privacy Shield Watermark */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#C5A059]/30 text-[11px] font-medium text-[#7A676A]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#88243C]" />
          <span>Privacy Protected</span>
        </div>

        <div className="max-w-xl mx-auto text-center">
          {/* Contact Person */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCEEE9] text-[#88243C] text-xs font-semibold mb-4">
            <User className="w-3.5 h-3.5" />
            <span>Point of Contact: {data.contact.contactPerson}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2D2224] mb-1">
            Kumawat Family (Parents)
          </h3>
          <p className="text-xs text-[#7A676A] flex items-center justify-center gap-1 mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#88243C]" />
            <span>{data.contact.residenceCity}</span>
          </p>

          {/* Number Display Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#FAF6F0] to-[#FDFBF7] border border-[#C5A059]/40 shadow-inner mb-6">
            <span className="text-[11px] uppercase tracking-wider text-[#7A676A] block font-medium mb-1">
              Parents Contact Number
            </span>

            <div className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-[#6E1A2D] my-2 select-all">
              {isRevealed ? formattedFullPhone : maskedPhone}
            </div>

            {/* Reveal / Hide Button */}
            {!isRevealed ? (
              <button
                onClick={() => setIsRevealed(true)}
                className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#88243C] to-[#6E1A2D] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition-all border border-[#DFBE76]/40 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#F3E5AB]" />
                <span>Reveal Contact Number</span>
              </button>
            ) : (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={`tel:+91${rawPhone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#88243C] text-white text-xs font-semibold hover:bg-[#6E1A2D] shadow-sm transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/91${rawPhone}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF6F0] text-[#6E1A2D] text-xs font-semibold border border-[#C5A059]/40 hover:bg-[#FCEEE9] transition-all"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsRevealed(false)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs text-[#7A676A] hover:text-[#2D2224] transition-colors"
                  title="Hide number again"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide</span>
                </button>
              </div>
            )}
          </div>

          {/* Privacy advisory message */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A676A] bg-[#FAF6F0] p-3 rounded-xl border border-[#C5A059]/20">
            <AlertCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>
              Please reach out during reasonable daylight hours (9:00 AM – 8:00 PM IST) for matrimonial discussions.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
