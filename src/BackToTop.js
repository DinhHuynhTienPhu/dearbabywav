import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Round button at the bottom-right, shown after scrolling past the first screen (the hero)
export default function BackToTop() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const rafRef = useRef(null);

    useEffect(() => {
        const update = () => {
            setVisible(window.scrollY > window.innerHeight);
            rafRef.current = null;
        };
        const onScroll = () => {
            if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <button
            className={`back-to-top ${visible ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('nav.backToTop')}
            title={t('nav.backToTop')}
            tabIndex={visible ? 0 : -1}
        >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}
