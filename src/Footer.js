import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GOATCOUNTER_SITE } from './analytics.js';

export default function Footer() {
  const { t } = useTranslation();
  // total visitors of the whole site, as GoatCounter formats it (e.g. "1,234").
  // Stays null when the counter is unavailable (setting off, adblock, offline) -> the line is hidden
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    // GoatCounter caches this number for up to 4 hours.
    // Needs "Allow adding visitor counts on your website" ON in GoatCounter settings, otherwise 403
    fetch(GOATCOUNTER_SITE + '/counter/TOTAL.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data && data.count) setVisitors(data.count); })
      .catch(() => {});
  }, []);

  return (
    <footer aria-label="site-footer" style={{
      position: 'relative',
      zIndex: 9999,
      minHeight: 72,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      background: 'linear-gradient(180deg, #070707 0%, #000 100%)',
      color: '#d0d0d0',
      padding: '10px 12px',
      boxSizing: 'border-box',
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
        <span style={{opacity: 0.95}}>{t('footer.madeBy')}</span>
        <span aria-hidden="true" style={{color: '#ff6b6b', fontSize: 26, lineHeight: 1, fontStyle: 'italic'}}>♥</span>
        {/* <span style={{opacity: 0.85}}>love</span>
        <span aria-hidden="true" style={{ color: '#ff6b6b', fontSize: 16, lineHeight: 1 }}>♥</span> */}
      </div>
      {visitors && (
        <div style={{
          fontSize: 12,
          opacity: 0.55,
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
        }}>
          {t('footer.visitors', { n: visitors })}
        </div>
      )}
    </footer>
  );
}
