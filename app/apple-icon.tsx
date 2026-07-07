import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** iOS home-screen / share icon — brand tile matching the navy truck favicon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a1a2b 0%, #13314e 100%)',
          color: '#ffffff',
          fontSize: 74,
          fontWeight: 800,
          letterSpacing: -3,
        }}
      >
        <span>BAT</span>
        <span style={{ color: '#2e5bff', marginLeft: 2 }}>.</span>
      </div>
    ),
    { ...size },
  );
}
