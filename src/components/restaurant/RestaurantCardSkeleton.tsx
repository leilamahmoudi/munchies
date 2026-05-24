export function RestaurantCardSkeleton() {
  return (
    <div
      className="relative bg-white overflow-hidden flex flex-col"
      style={{
        height: '202px',
        borderRadius: '8px',
        border: '0.6px solid rgba(0,0,0,0.06)',
        padding: '16px',
        justifyContent: 'space-between',
      }}
    >
      {/* Chips row */}
      <div className="flex items-center gap-2">
        {/* Open pill */}
        <div className="skeleton" style={{ width: '63px', height: '28px', borderRadius: '88px' }} />
        {/* Delivery time pill */}
        <div className="skeleton" style={{ width: '72px', height: '28px', borderRadius: '88px' }} />
      </div>

      {/* Food image placeholder — top right */}
      <div
        className="skeleton absolute"
        style={{
          top: '8px',
          right: '8px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          opacity: 0.5,
        }}
      />

      {/* CTA row */}
      <div className="flex items-center justify-between" style={{ height: '32px' }}>
        {/* Restaurant name */}
        <div className="skeleton" style={{ width: '55%', height: '20px', borderRadius: '6px' }} />
        {/* Arrow button */}
        <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '88px', flexShrink: 0 }} />
      </div>
    </div>
  );
}
