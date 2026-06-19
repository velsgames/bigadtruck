import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bigadtruck Group — A truckload of ideas, delivered.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0a1a2b 0%, #13314e 100%)',
          color: '#eef3f8',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: '#2e5bff',
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>BIGADTRUCK GROUP</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            A truckload of ideas,
          </div>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span>delivered to&nbsp;</span>
            <span style={{ color: '#2e5bff' }}>every destination.</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#93a6ba' }}>
          <span>Advertising · Marketing · Technology</span>
          <span>Pune &amp; Mumbai</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
