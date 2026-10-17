import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trackClick } from './analytics.js';

const LANGS = {
  en: { code: 'en', label: 'English', flag: 'https://flagcdn.com/w20/us.png' },
  vi: { code: 'vi', label: 'Tiếng Việt', flag: 'https://flagcdn.com/w20/vn.png' },
  ko: { code: 'ko', label: '한국어', flag: 'https://flagcdn.com/w20/kr.png' },
};

// id = the section's id attribute, label = translation key
const NAV_ITEMS = [
  { id: 'triples', label: 'nav.triples' },
  { id: 'system', label: 'nav.system' },
  { id: 'terms', label: 'nav.terms' },
  { id: 'know', label: 'nav.know' },
  { id: 'members', label: 'nav.members' },
  { id: 'links', label: 'nav.links' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const navBtnRef = useRef(null);
  const navMenuRef = useRef(null);

  const current = useMemo(() => {
    const key = (i18n.language || 'en').split('-')[0];
    return LANGS[key] || LANGS.en;
  }, [i18n.language]);

  useEffect(() => {
    const isOutside = (target, btn, menu) =>
      btn.current && !btn.current.contains(target) && menu.current && !menu.current.contains(target);
    const onClick = (e) => {
      if (open && isOutside(e.target, btnRef, menuRef)) setOpen(false);
      if (navOpen && isOutside(e.target, navBtnRef, navMenuRef)) setNavOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setNavOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, navOpen]);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
    trackClick('lang: ' + lng);
  };

  const onNavClick = (id) => {
    setNavOpen(false);
    trackClick('nav: ' + id);
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
          <span className="brand-name">WELCOMEWAV</span>
        </a>

        {/* desktop: inline section links */}
        <nav className="header-nav" aria-label={t('nav.menu')}>
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={'#' + item.id} className="header-nav-link" onClick={() => onNavClick(item.id)}>
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-dropdown">
            <button
              ref={btnRef}
              className="lang-button"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => { setOpen((v) => !v); setNavOpen(false); }}
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

          {/* mobile / tablet: section links in a dropdown */}
          <div className="nav-dropdown">
            <button
              ref={navBtnRef}
              className="nav-toggle"
              aria-haspopup="menu"
              aria-expanded={navOpen}
              aria-label={t('nav.menu')}
              onClick={() => { setNavOpen((v) => !v); setOpen(false); }}
            >
              <span className="nav-toggle-bars" aria-hidden="true" />
            </button>

            {navOpen && (
              <div ref={navMenuRef} className="nav-menu" role="menu">
                {NAV_ITEMS.map((item) => (
                  <a key={item.id} href={'#' + item.id} className="nav-menu-item" role="menuitem" onClick={() => onNavClick(item.id)}>
                    {t(item.label)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
