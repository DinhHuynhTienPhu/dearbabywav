import React from 'react';

export default function Footer() {
  return (
    <footer aria-label="site-footer" style={{
      position: 'relative',
      zIndex: 9999,
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #070707 0%, #000 100%)',
      color: '#d0d0d0',
      padding: '0 12px',
      fontSize: '14px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 -6px 18px rgba(0,0,0,0.6)'
    }}>
      <div style={{
        maxWidth: 980,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
      }}>
        <span style={{opacity: 0.95}}>made by wav with</span>
        <span aria-hidden="true" style={{color: '#ff6b6b', fontSize: 26, lineHeight: 1, fontStyle: 'italic'}}>♥</span>
        {/* <span style={{opacity: 0.85}}>love</span>
        <span aria-hidden="true" style={{ color: '#ff6b6b', fontSize: 16, lineHeight: 1 }}>♥</span> */}
      </div>
    </footer>
  );
}
