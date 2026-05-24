'use client';

type Props = {
  label: string;
  isActive: boolean;
  onToggle: () => void;
};

export function FilterButton({ label, isActive, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        'text-[12px] font-normal leading-[125%] whitespace-nowrap transition-colors',
        isActive
          ? 'bg-gray-900 text-white'
          : 'bg-white text-black hover:bg-gray-50',
      ].join(' ')}
      style={{
        borderRadius: '8px',
        border: '0.6px solid rgba(0,0,0,0.1)',
        padding: '8px 12px',
        letterSpacing: '-0.5px',
      }}
    >
      {label}
    </button>
  );
}
