import React from 'react';

interface OrnamentalDividerProps {
  className?: string;
  variant?: 'gold' | 'maroon' | 'simple';
  symbol?: string;
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  className = '',
  variant = 'gold',
  symbol = '🪷',
}) => {
  const lineColor = variant === 'maroon' ? 'border-[#88243C]/40' : 'border-[#C5A059]/40';
  const textColor = variant === 'maroon' ? 'text-[#88243C]' : 'text-[#C5A059]';

  return (
    <div className={`flex items-center justify-center my-6 gap-3 ${className}`}>
      <div className={`h-[1px] w-12 sm:w-24 border-t ${lineColor}`} />
      <span className="text-xs text-[#C5A059]/70">✦</span>
      <span className={`text-base ${textColor} select-none`}>{symbol}</span>
      <span className="text-xs text-[#C5A059]/70">✦</span>
      <div className={`h-[1px] w-12 sm:w-24 border-t ${lineColor}`} />
    </div>
  );
};
