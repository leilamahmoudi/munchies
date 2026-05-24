'use client';

import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';

export default function WelcomePage() {
  const router = useRouter();

  function handleContinue() {
    sessionStorage.setItem('munchies_welcomed', 'true');
    router.push('/');
  }

  return (
    <div
      className="flex flex-col min-h-dvh w-full mx-auto"
      style={{
        backgroundColor: '#00703A',
        padding: '94px 24px 40px',
      }}
    >
      {/* Logo */}
      <div style={{ width: '167px' }}>
        <Logo white />
      </div>

      {/* Spacer — 211px gap between logo and headline in Figma (812px frame) */}
      <div style={{ flex: '211 1 0' }} />

      {/* Headline */}
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 760,
          lineHeight: '1',
          letterSpacing: '-1px',
          color: '#FFFFFF',
          margin: '0 0 16px',
          maxWidth: '246px',
        }}
      >
        Treat yourself.
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '1.5',
          letterSpacing: '-0.5px',
          color: '#FFFFFF',
          margin: 0,
          maxWidth: '246px',
        }}
      >
        Find the best restaurants in your city and get it delivered to your place!
      </p>

      {/* Spacer — 233px gap between subtitle and button in Figma (812px frame) */}
      <div style={{ flex: '233 1 0' }} />

      {/* Continue button */}
      <button
        onClick={handleContinue}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '20px 24px',
          borderRadius: '8px',
          border: '1px solid #FFFFFF',
          color: '#FFFFFF',
          fontSize: '16px',
          fontWeight: 700,
          lineHeight: '1',
          letterSpacing: '-0.5px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        Continue
      </button>
    </div>
  );
}
