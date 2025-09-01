import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = {
  en: { code: 'en', label: 'English', flag: 'https://flagcdn.com/w20/us.png' },
  vi: { code: 'vi', label: 'Tiếng Việt', flag: 'https://flagcdn.com/w20/vn.png' },
  ko: { code: 'ko', label: '한국어', flag: 'https://flagcdn.com/w20/kr.png' },
};

export default function Header() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const current = useMemo(() => {
    const key = (i18n.language || 'en').split('-')[0];
    return LANGS[key] || LANGS.en;
  }, [i18n.language]);

  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (
        btnRef.current && !btnRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const onImgError = (e) => {
    if (e.currentTarget.dataset.fallbackApplied) return;
    e.currentTarget.dataset.fallbackApplied = 'true';
    e.currentTarget.src = './logo.png';
  };

  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <a href="/" className="header-brand" aria-label="home">
          <img src="./logo.png" alt="logo" className="brand-logo" />
          <span className="brand-name">dearbabywav</span>
        </a>

        <div className="header-actions">
          <div className="lang-dropdown">
            <button
              ref={btnRef}
              className="lang-button"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              title={current.label}
            >
              <img className="lang-flag" src={current.flag} alt="current language" onError={onImgError} />
              <span className="lang-code">{current.code.toUpperCase()}</span>
              <span className="lang-caret" aria-hidden>▾</span>
            </button>

            {open && (
              <div ref={menuRef} className="lang-menu" role="menu">
                {Object.values(LANGS).map((l) => (
                  <button
                    key={l.code}
                    className={`lang-item ${l.code === current.code ? 'selected' : ''}`}
                    role="menuitemradio"
                    aria-checked={l.code === current.code}
                    onClick={() => changeLang(l.code)}
                    title={l.label}
                  >
                    <img className="lang-flag" src={l.flag} alt="" onError={onImgError} />
                    <span className="lang-label">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
