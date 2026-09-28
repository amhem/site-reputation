import React from 'react';

export const RiskBadge: React.FC<{ level: 'Low' | 'Medium' | 'Critical' }> = ({ level }) => {
  const classes = level === 'Critical'
    ? 'bg-red-500/10 text-red-400 border-red-500/20'
    : level === 'Medium'
      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

  return (
    <span className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-widest ${classes}`}>
      {level} Risk
    </span>
  );
};
