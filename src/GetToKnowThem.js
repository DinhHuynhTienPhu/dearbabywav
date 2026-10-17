import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { trackClick } from './analytics.js';

const Step = ({ step, number, active, side, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        trackClick('video: ' + step.key);
        if (step.url) {
            window.open(step.url, '_blank', 'noopener,noreferrer');
        } else if (onClick) {
            onClick(step);
        }
    };

    const Content = (
        <div className="gk-content">
            <div className="gk-num">{String(number).padStart(2, '0')}</div>
            {step.url ? (
                <a
                    className="gk-title gk-title-link"
                    href={step.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('video: ' + step.key)}
                >
                    {step.title}
                </a>
            ) : (
                <button className="gk-title gk-title-btn" onClick={handleClick}>
                    {step.title}
                </button>
            )}
            {step.description && <div className="gk-desc">{step.description}</div>}
        </div>
    );

    return (
        <div className={`gk-step ${active ? 'active' : ''}`}>
            <div className="gk-side gk-left">{side === 'left' ? Content : null}</div>
            <div className="gk-center">
                <button className="gk-icon-btn" onClick={handleClick} aria-label={step.title}>
                    <img className="gk-icon" src={step.icon || './logo.png'} alt="" loading="lazy" decoding="async" />
                </button>
            </div>
            <div className="gk-side gk-right">{side === 'right' ? Content : null}</div>
        </div>
    );
};

function GetToKnowThem() {
    const { t } = useTranslation();
    // key = name used for click analytics (same in every language)
    const stepsBase = [
        { key: 'thesis', icon: './thesis.webp', url: 'https://www.youtube.com/watch?v=TVrdkrqpBV4' },
        { key: 'gura-show', icon: './gurashow.webp', url: 'https://www.youtube.com/watch?v=HaUXySGq2DY' },
        { key: 'weekly-idol', icon: './weeklyidol.jpg', url: 'https://www.youtube.com/watch?v=7fJQAljAMJQ' },
        { key: 'chaeyeon-guide', icon: './chaeyeonguide.webp', url: 'https://www.youtube.com/watch?v=IE0hEAgT2UY' },
        { key: 'ben-atmos', icon: './benatmos.webp', url: 'https://youtu.be/3yCF8aXzgnI?si=IA9EISdm1eQ4pgWN' },
        { key: 'badge-war', icon: './badgewar.webp', url: 'https://www.youtube.com/watch?v=H3Eidd3h4CE&list=PLuuVJzM7See49APBWO33WMLcal8qq8K6O' },
        { key: 'signal', icon: './signal.png', url: 'https://www.youtube.com/watch?v=jn2hiI7rqTA&list=PLtfvnr3voKT2TA3uFFqrrzNdOrfGQKlEs' },
        { key: 'signal-abridged', icon: './signalshort.webp', url: 'https://www.youtube.com/watch?v=rbbwTY7AV2Y&list=PLxfQOCAfcvMtiVEXtXrEQDjtwasdIU_kj' },
    ];
    const stepTexts = t('know.steps', { returnObjects: true }) || [];
    const steps = stepsBase.map((s, idx) => ({
        ...s,
        title: stepTexts[idx]?.title || '',
        description: stepTexts[idx]?.desc || ''
    }));

    return (
        <section className="section" id="know">
            <h1 className="section-header">{t('know.title')}</h1>
            <p className="section-text">{t('know.subtitle')}</p>

            <div className="gk-wrapper">
                <div className="gk-track" aria-hidden="true" />
                <div className="gk-progress" style={{ height: '100%' }} aria-hidden="true" />
                <div className="gk-steps">
                    {steps.map((s, idx) => (
                        <Step key={idx} step={s} number={idx + 1} active={true} side={idx % 2 === 0 ? 'left' : 'right'} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GetToKnowThem;
